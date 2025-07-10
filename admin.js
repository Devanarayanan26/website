
const supabaseUrl = 'https://hwqwcmmhihystzrydmfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXdjbW1oaWh5c3R6cnlkbWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwODE2MTMsImV4cCI6MjA2NzY1NzYxM30.Ufx_0kDe-0FCR1MmV_9bj7uKKSpNe7oMRHu8to_12c8';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('login-btn').onclick = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) alert('Login failed');
};

document.getElementById('logout-btn').onclick = async () => {
  await supabase.auth.signOut();
  location.reload();
};

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'block';
    loadBlogs();
  }
});

async function uploadBlog() {
  const title = document.getElementById('blog-title').value.trim();
  const content = document.getElementById('blog-content').value.trim();
  const file = document.getElementById('blog-image').files[0];

  if (!title || !content || !file) {
    alert('Please fill in all fields');
    return;
  }

  const { data: imageData, error: uploadError } = await supabase.storage
    .from('avnupload')
    .upload(`blog-${Date.now()}`, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    alert('Image upload failed');
    return;
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/avnupload/${imageData.path}`;

  const { error: insertError } = await supabase
    .from('blogs')
    .insert([{ title, content, image: imageUrl }]);

  if (insertError) {
    alert('Blog upload failed');
  } else {
    alert('Blog uploaded successfully!');
    loadBlogs();
  }
}

async function loadBlogs() {
  const { data, error } = await supabase.from('blogs').select('*').order('id', { ascending: false });
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';

  if (data) {
    data.forEach(blog => {
      blogList.innerHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
          <h3>${blog.title}</h3>
          <img src="${blog.image}" alt="Blog Image" style="max-width:200px;">
          <p>${blog.content}</p>
        </div>
      `;
    });
  }
}

