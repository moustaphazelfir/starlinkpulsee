const url = 'https://ubysoakglzpssxbgppfj.supabase.co/rest/v1/articles?slug=eq.maximiser-les-debits-starlink-astuces-de-pro-pour-reduire-le-ping-et-supprimer-les-obstructions';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieXNvYWtnbHpwc3N4YmdwcGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzI3MTgsImV4cCI6MjA5OTcwODcxOH0.dAiYHNaIyZ3xtCaI1LjzhpY8knds040MYBAHxBow8E4';

fetch(url, {
  method: 'PATCH',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  },
  body: JSON.stringify({
    slug: 'ameliorer-la-vitesse-internet-ping-starlink'
  })
})
.then(res => res.json())
.then(data => console.log('UPDATE RESULT:', data))
.catch(err => console.error(err));
