const url = 'https://ubysoakglzpssxbgppfj.supabase.co/rest/v1/articles?select=title,slug,status';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieXNvYWtnbHpwc3N4YmdwcGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzI3MTgsImV4cCI6MjA5OTcwODcxOH0.dAiYHNaIyZ3xtCaI1LjzhpY8knds040MYBAHxBow8E4';

fetch(url, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`
  }
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
