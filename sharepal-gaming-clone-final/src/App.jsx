import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Heart, IndianRupee,
  Loader2, LockKeyhole, MapPin, Menu, Search, ShieldCheck, ShoppingBag, Star, Truck,
  UserRound, X
} from 'lucide-react';

const fallbackProducts = [];
const categories = ['All', 'PS5 Console', 'Racing Wheel', 'PS5 Games'];
const reviews = [
  { name: 'Afrana', city: 'Bangalore', product: 'Gaming Console', text: 'Have used their services twice now. Quick responses, transparent process, hassle-free delivery and great products.' },
  { name: 'Satyaki', city: 'Kolkata', product: 'Trekking Gear', text: 'On-time delivery, products in very good condition and a simple, transparent experience from booking to return.' },
  { name: 'Amal', city: 'Bangalore', product: 'Gaming Console', text: 'Renting a console is affordable and easy. The support team is helpful and the pickup process is smooth.' }
];
const faqs = [
  ['How can I rent gaming gadgets from SharePal?', 'Select your rental dates, choose a product, log in, add it to your cart and continue to checkout. This clone reproduces that interaction flow for the assignment.'],
  ['Is there a security deposit?', 'The page highlights zero-security-deposit rentals for eligible products, matching the SharePal rental experience.'],
  ['When does my rental period start?', 'The rental starts on your selected start date and ends on the selected return date. The UI automatically calculates rental days and the displayed estimated total.'],
  ['Are unavailable products shown?', 'Yes. Products marked out_of_stock in the supplied JSON remain visible, but their booking button is disabled.'],
  ['Where is product data loaded from?', 'The API reads MongoDB when configured and seeded. If MongoDB is unavailable or empty, it falls back to the exact product-list.json supplied with the assignment.']
];

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function Brand() {
  return <div className="brand-mark" aria-label="SharePal"><span>share</span><strong>pal</strong><i>↗</i></div>;
}

function Header({ query, setQuery, user, onLogin, onLogout, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className="microbar">Rent more. Own less. Live more.</div>
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button className="location-pill"><MapPin size={17}/><span><small>Delivery location</small><b>Bangalore</b></span><ChevronDown size={15}/></button>
        <div className="header-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search PS5, games, controllers..." /></div>
        <nav className="desktop-nav"><a href="#products">Gaming</a><a href="#why">Why rent</a><a href="#faq">FAQs</a></nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Cart"><ShoppingBag size={20}/>{cartCount>0 && <span className="cart-badge">{cartCount}</span>}</button>
          {user ? <div className="user-menu"><span className="user-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</span><div><small>Hi, {user.name?.split(' ')[0]}</small><button onClick={onLogout}>Logout</button></div></div> : <button className="login-button" onClick={onLogin}><UserRound size={17}/> Login</button>}
          <button className="mobile-menu-button" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {menuOpen && <div className="mobile-nav"><a href="#products" onClick={()=>setMenuOpen(false)}>Gaming</a><a href="#why" onClick={()=>setMenuOpen(false)}>Why rent</a><a href="#faq" onClick={()=>setMenuOpen(false)}>FAQs</a></div>}
    </header>
  </>;
}

function Hero() {
  return <section className="hero-shell">
    <div className="hero-copy">
      <span className="eyebrow light">GAMING GADGETS ON RENT</span>
      <h1>Level up your weekend.<br/><em>Rent the setup.</em></h1>
      <p>Play the latest PlayStation experiences in Bangalore without buying expensive hardware. Pick your dates, choose your console and get it delivered.</p>
      <div className="hero-points"><span><ShieldCheck/>Zero security deposit</span><span><Truck/>Doorstep delivery & pickup</span><span><IndianRupee/>Affordable daily rentals</span></div>
      <a className="hero-cta" href="#products">Explore gaming products <ChevronRight size={18}/></a>
    </div>
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-orb"></div>
      <img src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-2-controllers/ps5-with-100-games-with-2-controllers-on-rent-sharepal-1.webp" alt=""/>
      <div className="floating-card one"><Star size={15} fill="currentColor"/> 4.8 top-rated</div>
      <div className="floating-card two">100+ games available</div>
    </div>
  </section>;
}

function DateSelector({ startDate, setStartDate, endDate, setEndDate }) {
  const min = new Date().toISOString().slice(0,10);
  return <section className="date-card">
    <div><span className="eyebrow dark">WHEN DO YOU WANT TO PLAY?</span><h2>Select rental dates</h2><p>Prices and estimated totals update automatically.</p></div>
    <div className="date-controls">
      <label><CalendarDays size={20}/><span><small>Start date</small><input type="date" min={min} value={startDate} onChange={e=>setStartDate(e.target.value)} /></span></label>
      <div className="date-separator">→</div>
      <label><CalendarDays size={20}/><span><small>End date</small><input type="date" min={startDate || min} value={endDate} onChange={e=>setEndDate(e.target.value)} /></span></label>
    </div>
  </section>;
}

function ProductCard({ product, days, onAdd, isInCart }) {
  const [favorite, setFavorite] = useState(false);
  const total = days ? Math.round(product.per_day_rent * days) : null;
  return <article className="product-card">
    <div className="product-image-wrap">
      {product.tag && <span className={`product-tag ${product.tag.toLowerCase().replaceAll(' ','-')}`}>{product.tag}</span>}
      <button className={`favorite ${favorite?'active':''}`} onClick={()=>setFavorite(!favorite)} aria-label="Favorite"><Heart size={19} fill={favorite?'currentColor':'none'}/></button>
      <img src={product.image} alt={product.name} loading="lazy" onError={e=>{e.currentTarget.style.opacity='.25'}} />
      {product.out_of_stock && <div className="stock-overlay">Temporarily unavailable</div>}
    </div>
    <div className="product-body">
      <div className="rating-row"><span><Star size={14} fill="currentColor"/> {product.rating || 'New'}</span><small>{product.booked_count.toLocaleString('en-IN')} bookings</small></div>
      <h3>{product.name}</h3>
      <div className="price-row"><div><small>Starting at</small><strong>₹{product.per_day_rent.toLocaleString('en-IN')}<em>/day</em></strong></div>{days && <div className="estimate"><small>{days} day{days>1?'s':''}</small><b>₹{total.toLocaleString('en-IN')}</b></div>}</div>
      <div className="guarantee-line"><ShieldCheck size={14}/> Quality checked before dispatch</div>
      <button className={`book-button ${isInCart?'added':''}`} disabled={product.out_of_stock} onClick={()=>onAdd(product)}>{product.out_of_stock?'Out of stock':isInCart?<><Check size={17}/> Added to cart</>:'Add to cart'}</button>
    </div>
  </article>;
}

function LoginModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'demo@sharepalclone.com', password:'Demo@123' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      onSuccess(data);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="auth-modal">
      <button className="modal-close" onClick={onClose}><X/></button>
      <Brand/>
      <div className="auth-icon"><LockKeyhole/></div>
      <h2>{mode==='login'?'Welcome back':'Create your account'}</h2>
      <p>{mode==='login'?'Login to continue your rental journey.':'Registration uses MongoDB when MONGODB_URI is configured.'}</p>
      <form onSubmit={submit}>
        {mode==='register' && <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>}
        <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" disabled={busy}>{busy?<Loader2 className="spin"/>:mode==='login'?'Login':'Create account'}</button>
      </form>
      {mode==='login' && <div className="demo-box"><b>Working demo credentials</b><span>demo@sharepalclone.com</span><span>Demo@123</span></div>}
      <button className="switch-auth" onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login'?'Need an account? Register':'Already registered? Login'}</button>
    </div>
  </div>;
}

function TrustSection() {
  const items = [
    ['01','Book in minutes','Pick dates, choose your product and add it to cart.'],
    ['02','Doorstep convenience','The rental experience is designed around delivery and pickup.'],
    ['03','Play without owning','Enjoy premium gaming for the days you actually need it.']
  ];
  return <section id="why" className="trust-section"><div className="section-head"><span className="eyebrow dark">HOW RENTING HELPS</span><h2>Premium gaming, minus the ownership cost.</h2></div><div className="trust-grid">{items.map(x=><div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section id="faq" className="faq-section"><div className="faq-intro"><span className="eyebrow dark">NEED HELP?</span><h2>Frequently asked questions</h2><p>Quick answers about the assignment flow and rental experience.</p></div><div className="faq-list">{faqs.map((f,i)=><article key={f[0]} className={open===i?'open':''}><button onClick={()=>setOpen(open===i?-1:i)}><span>{f[0]}</span><b>{open===i?'−':'+'}</b></button>{open===i&&<p>{f[1]}</p>}</article>)}</div></section>;
}

function Reviews() {
  const [index,setIndex]=useState(0);
  const r=reviews[index];
  return <section className="review-section"><div><span className="eyebrow light">TRUSTED RENTAL EXPERIENCE</span><h2>Loved by renters who prefer access over ownership.</h2><div className="review-arrows"><button onClick={()=>setIndex((index-1+reviews.length)%reviews.length)}><ChevronLeft/></button><button onClick={()=>setIndex((index+1)%reviews.length)}><ChevronRight/></button></div></div><article><div className="review-stars">★★★★★</div><blockquote>“{r.text}”</blockquote><footer><div className="review-avatar">{r.name[0]}</div><span><b>{r.name}</b><small>{r.city} • {r.product}</small></span></footer></article></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Brand/><p>A technical assignment recreation inspired by SharePal's gaming rental experience. Product data is loaded from the supplied JSON file.</p></div><div className="footer-links"><div><b>Gaming</b><a href="#products">PS5 Consoles</a><a href="#products">Racing Wheels</a><a href="#products">PS5 Games</a></div><div><b>Help</b><a href="#faq">FAQs</a><a href="#why">How it works</a></div><div><b>Assignment</b><span>MERN-ready architecture</span><span>Vercel-compatible API</span><span>MongoDB + JSON fallback</span></div></div><div className="footer-bottom"><span>© 2026 SharePal Clone — Educational/assignment recreation</span><span>Bangalore</span></div></footer>;
}

export default function App() {
  const [products,setProducts]=useState(fallbackProducts);
  const [loading,setLoading]=useState(true);
  const [apiError,setApiError]=useState('');
  const [source,setSource]=useState('');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const [sort,setSort]=useState('trending');
  const [startDate,setStartDate]=useState('');
  const [endDate,setEndDate]=useState('');
  const [loginOpen,setLoginOpen]=useState(false);
  const [user,setUser]=useLocalStorage('sharepal_user',null);
  const [token,setToken]=useLocalStorage('sharepal_token','');
  const [cart,setCart]=useLocalStorage('sharepal_cart',[]);

  useEffect(()=>{
    let active=true;
    setLoading(true);
    fetch('/api/products')
      .then(async r=>{const data=await r.json(); if(!r.ok) throw new Error(data.message||'Could not load products'); return data;})
      .then(data=>{if(active){setProducts(data.products||[]);setSource(data.source||'api');setApiError('')}})
      .catch(err=>{if(active)setApiError(err.message)})
      .finally(()=>{if(active)setLoading(false)});
    return ()=>{active=false};
  },[]);

  useEffect(()=>{
    if(!token) return;
    fetch('/api/auth/me',{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.ok?r.json():Promise.reject()).then(d=>setUser(d.user)).catch(()=>{setUser(null);setToken('')});
  },[]);

  const days = useMemo(()=>{
    if(!startDate||!endDate) return 0;
    const diff=(new Date(endDate)-new Date(startDate))/(1000*60*60*24);
    return diff>=0?Math.floor(diff)+1:0;
  },[startDate,endDate]);

  const filtered = useMemo(()=>{
    let list=[...products];
    if(query.trim()) list=list.filter(p=>p.name.toLowerCase().includes(query.trim().toLowerCase()));
    if(category!=='All') list=list.filter(p=>p.category===category);
    const sorters={
      trending:(a,b)=>(b.tag==='Trending')-(a.tag==='Trending')||b.booked_count-a.booked_count,
      popularity:(a,b)=>b.booked_count-a.booked_count,
      rating:(a,b)=>b.rating-a.rating,
      priceLow:(a,b)=>a.per_day_rent-b.per_day_rent,
      priceHigh:(a,b)=>b.per_day_rent-a.per_day_rent
    };
    return list.sort(sorters[sort]);
  },[products,query,category,sort]);

  const addToCart=(product)=>{
    if(!user){setLoginOpen(true);return;}
    setCart(prev=>prev.some(i=>i.id===product.id)?prev: [...prev,{id:product.id,name:product.name,per_day_rent:product.per_day_rent,image:product.image}]);
  };
  const authSuccess=(data)=>{setUser(data.user);setToken(data.token);setLoginOpen(false)};
  const logout=()=>{setUser(null);setToken('');setCart([])};

  return <div>
    <Header query={query} setQuery={setQuery} user={user} onLogin={()=>setLoginOpen(true)} onLogout={logout} cartCount={cart.length}/>
    <Hero/>
    <main>
      <DateSelector {...{startDate,setStartDate,endDate,setEndDate}}/>
      <section id="products" className="products-section">
        <div className="products-heading"><div><span className="eyebrow dark">EXPLORE GAMING</span><h2>Gaming gadgets on rent in Bangalore</h2><p>Live product cards rendered from the supplied JSON through the backend API.</p></div><div className="source-pill"><span></span>{source?`Data: ${source}`:'Connecting...'}</div></div>
        <div className="toolbar"><div className="category-chips">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="trending">Trending</option><option value="popularity">Most booked</option><option value="rating">Highest rated</option><option value="priceLow">Price: Low to high</option><option value="priceHigh">Price: High to low</option></select></div>
        {days>0 && <div className="date-summary"><CalendarDays size={17}/><b>{days} rental day{days>1?'s':''}</b><span>{startDate} → {endDate}</span></div>}
        {apiError && <div className="api-error"><b>Product API is not responding.</b><span>{apiError}</span><span>For local development, run <code>npm run dev</code>. On Vercel, the included /api function is deployed automatically.</span></div>}
        {loading ? <div className="loading-state"><Loader2 className="spin"/><span>Loading products...</span></div> : <div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p} days={days} onAdd={addToCart} isInCart={cart.some(i=>i.id===p.id)}/>)}</div>}
        {!loading && !apiError && filtered.length===0 && <div className="empty-state">No products match this filter. Try “All” or clear your search.</div>}
      </section>
      <TrustSection/>
      <Reviews/>
      <FAQ/>
    </main>
    <Footer/>
    {loginOpen && <LoginModal onClose={()=>setLoginOpen(false)} onSuccess={authSuccess}/>} 
  </div>;
}
