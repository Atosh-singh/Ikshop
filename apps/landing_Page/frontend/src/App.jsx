import './App.css';

function App() {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <header className="header">
      <div className="header__logo-box">
        <img src="/logo-white.png" alt="Logo" className="header__logo" />
      </div>

      <div className="header__text-box">
        {/* Main Landing Page Heading */}
        <h1 className="heading-primary">
          <span className="heading-primary-main">TravelBazaar</span>
          <span className="heading-primary-sub">
            Your Hub for Shopping & Adventures
          </span>
        </h1>

        {/* Two Cards Side by Side */}
        <div className="cards-container">
          {/* Card 1 - Ecommerce */}
          <div className="card">
            <h2 className="card-title">E‑commerce Store</h2>
            <ul className="card-points">
              <li>Wide range of products</li>
              <li>Best price guarantee</li>
              <li>Secure online payments</li>
              <li>Fast delivery</li>
            </ul>
            <button
              className="btn btn-white"
              onClick={() => handleRedirect('https://ecommerce-website.com')}
            >
              Shop Now
            </button>
          </div>

          {/* Card 2 - Travel Booking */}
          <div className="card"> 
            <h2 className="card-title">Online Travel Booking</h2>
            <ul className="card-points">
              <li>Domestic & international tours</li>
              <li>Best hotel deals</li>
              <li>Easy online booking</li>
              <li>24/7 customer support</li>
            </ul>
            <button
              className="btn btn-white"
              onClick={() => handleRedirect('https://ota-website.com')}
            >
              Inventory Management Tool
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
