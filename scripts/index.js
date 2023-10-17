const { useState, useEffect } = React;

const PortfolioItem = ({ item, index, setActiveIndex }) => {
  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card" data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => setActiveIndex(index)}>
        <img src={item.imgSrc} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.description}</p>
          {item.link && <p><a href={item.link} className="btn btn-outline-primary">Learn More</a></p>}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('./data/portfolio-data.json')
      .then((response) => response.json())
      .then((data) => {
        setPortfolioItems(data);
      })
      .catch((error) => console.error('Error fetching portfolio data:', error));
  }, []);

  useEffect(() => {
    const grid = document.querySelector('.the-grid');
    imagesLoaded(grid, function() {
      new Masonry(grid, { percentPosition: true });
    });
  }, [portfolioItems]);

  return (
    <main className="masonry-grid">
      <div className="row the-grid">
        {portfolioItems.map((item, index) => (
          <PortfolioItem key={index} item={item} index={index} setActiveIndex={setActiveIndex} />
        ))}
      </div>

      {/* Simplified Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{portfolioItems[activeIndex]?.title}</h5>
         
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
      </div>        
         
            <div className="modal-body d-flex justify-content-center align-items-center">
                
              <img src={portfolioItems[activeIndex]?.imgSrc} className="img-fluid" alt="..." />
            </div>
        <div className="modal-body pt-0"> <p className="mb-0">{portfolioItems[activeIndex]?.description}</p>
        </div>    
          </div>
        </div>
      </div>
    </main>
  );
};

ReactDOM.render(<Portfolio />, document.getElementById('the-masonry-wrapper'));
