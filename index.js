import { menuArray } from './data.js';

const menuItems = document.getElementById('menu-items');
const orderBtn = document.getElementById('order-btn');
const orderSummary = document.getElementById('order-summary');
const summaryItems = document.getElementById('summary-items');
const summaryTotal = document.getElementById('summary-total');
const orderConfirm = document.getElementById('order-confirm');
const payModal = document.getElementById('pay-modal');
const closeBtn = document.getElementById('close-btn');

let orderItems = [];

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        addItemToOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItemFromOrder(e.target.dataset.remove)
    }
})

orderBtn.addEventListener('click', () => {
    payModal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    hideModal();
})

payModal.addEventListener('click', (e) => {
    if (e.target === payModal) {
        hideModal();
    }
})

payModal.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameValue = new FormData(e.target).get('name');
    hideModal();
    orderSummary.style.display = 'none';
    
    orderConfirm.innerHTML = `<h2>Thanks ${nameValue} ! Your order is on its way!</h2>`
    orderConfirm.style.display = 'block';
    
})

function hideModal() {
    payModal.style.display = 'none';
}

function displayMenu(items) {
    let itemHtml = items.map((item) => {
        return `
        <li>
            <div class="item">
                <span class="item-icon">${item.emoji}</span>
                <div class="item-infos">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <h3>$${item.price}</h3>
                </div>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </li>
        `
    })
    menuItems.innerHTML = itemHtml.join('')
}

function addItemToOrder(itemId) {
    const item = menuArray.find((el) => {
        return el.id === parseInt(itemId)
    })
    orderItems.push(item)
    
    if(orderItems.length) {
        orderSummary.style.display = 'block';
        summaryTotal.style.display = 'flex';
        displayOrder(orderItems);
    } 
}

function removeItemFromOrder(itemId) {
    orderItems = orderItems.filter((el) => {
        return el.id !== parseInt(itemId)
    })
    
    if(orderItems.length === 0) {
        orderSummary.style.display = 'none';
        summaryTotal.style.display = 'none';
    } else {
        displayOrder(orderItems);
    }
}

function displayOrder(items) {
    let itemHtml = ``;
    
    items.map((item) => {
        itemHtml += `<li class="summary-item">
                        <div>
                            <h3>${item.name} <button class="remove-btn" data-remove="${item.id}">remove</button></h3> 
                        </div>
                        <h3>$${item.price}</h3>
                    </li>`
    }).join('')
    
    const total = items.reduce((total, current) => {
        return total + current.price
    }, 0)
    
    const totalHtml = `<h3>Total price:</h3>
                    <h3>$${total}</h3>`
    
    summaryTotal.innerHTML = totalHtml
    summaryItems.innerHTML = itemHtml
}

displayMenu(menuArray);
