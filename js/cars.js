// cars.js - Complete Cars Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Sample car data - In real scenario, this would come from an API
    const carsData = [
        {
            id: 1,
            name: "Tesla Model S Plaid",
            brand: "Tesla",
            year: 2022,
            price: 89999,
            mileage: 5200,
            fuel: "Electric",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Autopilot", "Ludicrous+", "Premium Sound", "Glass Roof"],
            description: "The ultimate electric performance sedan with unprecedented acceleration and range."
        },
        {
            id: 2,
            name: "BMW M4 Competition",
            brand: "BMW",
            year: 2023,
            price: 76500,
            mileage: 8100,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["M Sport Package", "Carbon Roof", "Competition Pack", "Premium"],
            description: "High-performance coupe with aggressive styling and track-ready capabilities."
        },
        {
            id: 3,
            name: "Mercedes G 63 AMG",
            brand: "Mercedes",
            year: 2021,
            price: 124999,
            mileage: 12400,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["AMG Package", "4x4", "Premium+", "Night Package"],
            description: "Luxury SUV with brute power and sophisticated technology."
        },
        {
            id: 4,
            name: "Audi RS7 Sportback",
            brand: "Audi",
            year: 2023,
            price: 112000,
            mileage: 3500,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["RS Package", "Sport Exhaust", "Premium", "Driver Assist"],
            description: "Executive sports hatch with stunning design and explosive performance."
        },
        {
            id: 5,
            name: "Porsche 911 Turbo S",
            brand: "Porsche",
            year: 2022,
            price: 215000,
            mileage: 2800,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Turbo Package", "Sport Chrono", "Premium", "Carbon"],
            description: "Iconic sports car with breathtaking acceleration and precision handling."
        },
        {
            id: 6,
            name: "Range Rover Sport",
            brand: "Land Rover",
            year: 2023,
            price: 85000,
            mileage: 6200,
            fuel: "Diesel",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["HSE Pack", "4x4", "Premium Sound", "Air Suspension"],
            description: "Luxury SUV combining off-road capability with premium comfort."
        },
        {
            id: 7,
            name: "Toyota Supra GR",
            brand: "Toyota",
            year: 2023,
            price: 55000,
            mileage: 4500,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["GR Package", "Sport Mode", "Premium", "Track Ready"],
            description: "Modern sports legend with exceptional handling and performance."
        },
        {
            id: 8,
            name: "Ford Mustang GT",
            brand: "Ford",
            year: 2022,
            price: 42000,
            mileage: 8900,
            fuel: "Petrol",
            transmission: "Manual",
            image: "images/car.jpg",
            features: ["GT Package", "Performance Exhaust", "Premium", "Sport"],
            description: "American muscle with raw power and iconic styling."
        },
        {
            id: 9,
            name: "Nissan GT-R Nismo",
            brand: "Nissan",
            year: 2021,
            price: 175000,
            mileage: 3200,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Nismo Package", "Track Edition", "Premium", "AWD"],
            description: "Supercar slayer with incredible performance and technology."
        },
        {
            id: 10,
            name: "Lexus LC 500",
            brand: "Lexus",
            year: 2023,
            price: 95000,
            mileage: 2800,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Luxury Package", "Sport+", "Premium", "Mark Levinson"],
            description: "Grand tourer with stunning design and exceptional comfort."
        },
        {
            id: 11,
            name: "Chevrolet Corvette Stingray",
            brand: "Chevrolet",
            year: 2023,
            price: 68000,
            mileage: 5100,
            fuel: "Petrol",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Z51 Package", "Performance", "Premium", "Sport"],
            description: "Mid-engine American sports car with supercar performance."
        },
        {
            id: 12,
            name: "Hyundai Ioniq 5",
            brand: "Hyundai",
            year: 2023,
            price: 45000,
            mileage: 3200,
            fuel: "Electric",
            transmission: "Automatic",
            image: "images/car.jpg",
            features: ["Ultimate Pack", "Fast Charging", "Premium", "Tech"],
            description: "Futuristic electric crossover with rapid charging and advanced features."
        }
    ];

    // State management
    let currentFilters = {
        search: '',
        minPrice: 0,
        maxPrice: 200000,
        brands: [],
        minYear: 2000,
        maxYear: 2024,
        fuelTypes: [],
        transmissions: []
    };

    let displayedCars = 6;
    const carsPerLoad = 6;

    // DOM Elements
    const carsGrid = document.getElementById('cars-grid');
    const resultsCount = document.getElementById('results-count');
    const totalCars = document.getElementById('total-cars');
    const activeFiltersContainer = document.getElementById('active-filters');
    const modal = document.getElementById('car-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Initialize the page
    function init() {
        totalCars.textContent = carsData.length + '+';
        renderCars();
        setupEventListeners();
        updateResultsCount();
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Search
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentFilters.search = e.target.value.toLowerCase();
                applyFilters();
            });
        }

        // Price inputs
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        if (minPriceInput && maxPriceInput) {
            minPriceInput.addEventListener('input', (e) => {
                currentFilters.minPrice = parseInt(e.target.value) || 0;
                applyFilters();
            });

            maxPriceInput.addEventListener('input', (e) => {
                currentFilters.maxPrice = parseInt(e.target.value) || 200000;
                applyFilters();
            });
        }

        // Brand checkboxes
        document.querySelectorAll('.checkbox-group input[value]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const brand = e.target.value;
                if (e.target.checked) {
                    if (!currentFilters.brands.includes(brand)) {
                        currentFilters.brands.push(brand);
                    }
                } else {
                    currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
                }
                applyFilters();
            });
        });

        // Year inputs
        const minYearInput = document.getElementById('min-year');
        const maxYearInput = document.getElementById('max-year');
        if (minYearInput && maxYearInput) {
            minYearInput.addEventListener('input', (e) => {
                currentFilters.minYear = parseInt(e.target.value) || 2000;
                applyFilters();
            });

            maxYearInput.addEventListener('input', (e) => {
                currentFilters.maxYear = parseInt(e.target.value) || 2024;
                applyFilters();
            });
        }

        // Fuel type checkboxes
        document.querySelectorAll('input[value="Petrol"], input[value="Diesel"], input[value="Electric"], input[value="Hybrid"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const fuelType = e.target.value;
                if (e.target.checked) {
                    if (!currentFilters.fuelTypes.includes(fuelType)) {
                        currentFilters.fuelTypes.push(fuelType);
                    }
                } else {
                    currentFilters.fuelTypes = currentFilters.fuelTypes.filter(f => f !== fuelType);
                }
                applyFilters();
            });
        });

        // Transmission checkboxes
        document.querySelectorAll('input[value="Automatic"], input[value="Manual"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const transmission = e.target.value;
                if (e.target.checked) {
                    if (!currentFilters.transmissions.includes(transmission)) {
                        currentFilters.transmissions.push(transmission);
                    }
                } else {
                    currentFilters.transmissions = currentFilters.transmissions.filter(t => t !== transmission);
                }
                applyFilters();
            });
        });

        // Sort
        const sortSelect = document.getElementById('sort-by');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                sortCars(e.target.value);
            });
        }

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearFilters);
        }

        // Load more
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreCars);
        }

        // Modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Filter cars based on current filters
    function filterCars() {
        return carsData.filter(car => {
            // Search filter
            if (currentFilters.search && 
                !car.name.toLowerCase().includes(currentFilters.search) && 
                !car.brand.toLowerCase().includes(currentFilters.search)) {
                return false;
            }

            // Price filter
            if (car.price < currentFilters.minPrice || car.price > currentFilters.maxPrice) {
                return false;
            }

            // Brand filter
            if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(car.brand)) {
                return false;
            }

            // Year filter
            if (car.year < currentFilters.minYear || car.year > currentFilters.maxYear) {
                return false;
            }

            // Fuel type filter
            if (currentFilters.fuelTypes.length > 0 && !currentFilters.fuelTypes.includes(car.fuel)) {
                return false;
            }

            // Transmission filter
            if (currentFilters.transmissions.length > 0 && !currentFilters.transmissions.includes(car.transmission)) {
                return false;
            }

            return true;
        });
    }

    // Apply filters and update UI
    function applyFilters() {
        displayedCars = carsPerLoad;
        renderCars();
        updateActiveFilters();
        updateResultsCount();
    }

    // Sort cars
    function sortCars(sortBy) {
        const filteredCars = filterCars();
        
        switch (sortBy) {
            case 'price-low':
                filteredCars.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredCars.sort((a, b) => b.price - a.price);
                break;
            case 'year-new':
                filteredCars.sort((a, b) => b.year - a.year);
                break;
            case 'year-old':
                filteredCars.sort((a, b) => a.year - b.year);
                break;
            case 'mileage':
                filteredCars.sort((a, b) => a.mileage - b.mileage);
                break;
            default: // featured
                filteredCars.sort((a, b) => a.id - b.id);
        }
        
        renderCars(filteredCars);
    }

    // Render cars to the grid
    function renderCars(carsToRender = null) {
        const filteredCars = carsToRender || filterCars();
        const carsToShow = filteredCars.slice(0, displayedCars);
        
        if (!carsGrid) return;

        carsGrid.innerHTML = '';

        if (carsToShow.length === 0) {
            carsGrid.innerHTML = `
                <div class="no-results glass" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn btn-neon" onclick="clearFilters()">Clear All Filters</button>
                </div>
            `;
            return;
        }

        carsToShow.forEach(car => {
            const carCard = createCarCard(car);
            carsGrid.appendChild(carCard);
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredCars.length > displayedCars ? 'block' : 'none';
        }
    }

    // Create individual car card
    function createCarCard(car) {
        const card = document.createElement('div');
        card.className = 'car-card glass';
        card.innerHTML = `
            <div class="car-image">
                <div class="image-container">
                    <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/400x250/1a1a2e/667eea?text=Car+Image'">
                </div>
                <div class="car-badge neon-badge">${car.brand}</div>
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <span><i class="icon">⚡</i> ${car.year}</span>
                    <span><i class="icon">📊</i> ${car.mileage.toLocaleString()} mi</span>
                    <span><i class="icon">⛽</i> ${car.fuel}</span>
                </div>
                <div class="car-features">
                    ${car.features.slice(0, 2).map(feature => `<span>${feature}</span>`).join('')}
                    ${car.features.length > 2 ? `<span>+${car.features.length - 2} more</span>` : ''}
                </div>
                <div class="car-price">
                    <span class="price">$${car.price.toLocaleString()}</span>
                    <span class="price-note">${car.transmission}</span>
                </div>
                <button class="btn btn-glass btn-full view-details" data-car-id="${car.id}">
                    View Details
                </button>
            </div>
        `;

        // Add click event for view details
        card.querySelector('.view-details').addEventListener('click', () => {
            showCarDetails(car);
        });

        return card;
    }

    // Show car details in modal
    function showCarDetails(car) {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="car-detail">
                <div class="car-detail-image">
                    <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/600x400/1a1a2e/667eea?text=Car+Image'">
                </div>
                <div class="car-detail-info">
                    <h2>${car.name}</h2>
                    <div class="car-detail-price">$${car.price.toLocaleString()}</div>
                    
                    <div class="car-detail-specs">
                        <div class="spec-item">
                            <span class="spec-label">Brand:</span>
                            <span class="spec-value">${car.brand}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Year:</span>
                            <span class="spec-value">${car.year}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Mileage:</span>
                            <span class="spec-value">${car.mileage.toLocaleString()} miles</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Fuel Type:</span>
                            <span class="spec-value">${car.fuel}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Transmission:</span>
                            <span class="spec-value">${car.transmission}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Condition:</span>
                            <span class="spec-value">Excellent</span>
                        </div>
                    </div>

                    <div class="car-features" style="margin-bottom: 2rem;">
                        <h4 style="margin-bottom: 1rem; color: var(--text-lighter);">Features:</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${car.features.map(feature => `<span style="background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.8rem;">${feature}</span>`).join('')}
                        </div>
                    </div>

                    <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">${car.description}</p>

                    <div class="car-detail-actions">
                        <a href="https://wa.me/15551234567?text=Hi! I'm interested in the ${encodeURIComponent(car.name)}" 
                           class="btn btn-neon" target="_blank">
                            💬 WhatsApp Inquiry
                        </a>
                        <a href="tel:+15551234567" class="btn btn-glass">
                            📞 Call Now
                        </a>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Update active filters display
    function updateActiveFilters() {
        if (!activeFiltersContainer) return;

        activeFiltersContainer.innerHTML = '';

        // Search filter
        if (currentFilters.search) {
            addActiveFilter('search', `Search: "${currentFilters.search}"`);
        }

        // Price filter
        if (currentFilters.minPrice > 0 || currentFilters.maxPrice < 200000) {
            const min = currentFilters.minPrice > 0 ? `$${currentFilters.minPrice.toLocaleString()}` : 'Min';
            const max = currentFilters.maxPrice < 200000 ? `$${currentFilters.maxPrice.toLocaleString()}` : 'Max';
            addActiveFilter('price', `Price: ${min} - ${max}`);
        }

        // Brand filters
        currentFilters.brands.forEach(brand => {
            addActiveFilter('brand', `Brand: ${brand}`);
        });

        // Year filter
        if (currentFilters.minYear > 2000 || currentFilters.maxYear < 2024) {
            const min = currentFilters.minYear > 2000 ? currentFilters.minYear : 'Min';
            const max = currentFilters.maxYear < 2024 ? currentFilters.maxYear : 'Max';
            addActiveFilter('year', `Year: ${min} - ${max}`);
        }

        // Fuel type filters
        currentFilters.fuelTypes.forEach(fuel => {
            addActiveFilter('fuel', `Fuel: ${fuel}`);
        });

        // Transmission filters
        currentFilters.transmissions.forEach(transmission => {
            addActiveFilter('transmission', `Transmission: ${transmission}`);
        });
    }

    // Add individual active filter tag
    function addActiveFilter(type, text) {
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `
            ${text}
            <span class="remove" data-filter-type="${type}">×</span>
        `;

        filterTag.querySelector('.remove').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFilter(type, text);
        });

        activeFiltersContainer.appendChild(filterTag);
    }

    // Remove specific filter
    function removeFilter(type, text) {
        switch (type) {
            case 'search':
                currentFilters.search = '';
                document.getElementById('search').value = '';
                break;
            case 'price':
                currentFilters.minPrice = 0;
                currentFilters.maxPrice = 200000;
                document.getElementById('min-price').value = '';
                document.getElementById('max-price').value = '';
                break;
            case 'brand':
                const brand = text.replace('Brand: ', '');
                currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
                document.querySelector(`input[value="${brand}"]`).checked = false;
                break;
            case 'year':
                currentFilters.minYear = 2000;
                currentFilters.maxYear = 2024;
                document.getElementById('min-year').value = '';
                document.getElementById('max-year').value = '';
                break;
            case 'fuel':
                const fuel = text.replace('Fuel: ', '');
                currentFilters.fuelTypes = currentFilters.fuelTypes.filter(f => f !== fuel);
                document.querySelector(`input[value="${fuel}"]`).checked = false;
                break;
            case 'transmission':
                const transmission = text.replace('Transmission: ', '');
                currentFilters.transmissions = currentFilters.transmissions.filter(t => t !== transmission);
                document.querySelector(`input[value="${transmission}"]`).checked = false;
                break;
        }
        applyFilters();
    }

    // Clear all filters
    function clearFilters() {
        currentFilters = {
            search: '',
            minPrice: 0,
            maxPrice: 200000,
            brands: [],
            minYear: 2000,
            maxYear: 2024,
            fuelTypes: [],
            transmissions: []
        };

        // Reset form inputs
        document.getElementById('search').value = '';
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        document.getElementById('min-year').value = '';
        document.getElementById('max-year').value = '';
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset sort
        document.getElementById('sort-by').value = 'featured';

        applyFilters();
    }

    // Load more cars
    function loadMoreCars() {
        displayedCars += carsPerLoad;
        renderCars();
    }

    // Update results count
    function updateResultsCount() {
        if (resultsCount) {
            const filteredCars = filterCars();
            resultsCount.textContent = filteredCars.length;
        }
    }

    // Make clearFilters available globally for the no-results button
    window.clearFilters = clearFilters;

    // Initialize the cars page
    init();

    // Add this to your existing cars.js file
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
    
    // Cars page quote form submission
    const quoteForm = document.getElementById('cars-quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const vehicle = document.getElementById('quote-vehicle').value;
            const name = document.getElementById('quote-name').value;
            
            let message = `Thank you ${name}!`;
            if (vehicle && vehicle !== 'other') {
                message += ` We'll send you the detailed quote for the ${document.getElementById('quote-vehicle').options[document.getElementById('quote-vehicle').selectedIndex].text} shortly.`;
            } else {
                message += ` We'll contact you shortly with pricing information.`;
            }
            
            alert(message);
            quoteForm.reset();
        });
    }
});

    console.log('AutoElite Cars Page initialized 🚗✨');
});