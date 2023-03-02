const ItemCtrl = (function()
{
    const Item = function(id, nama, harga)
    {
        this.id     = id;
        this.nama   = nama;
        this.harga  = harga;
    }

    const data = {
        items: [
            // {id: 0, nama: 'seo', harga: 120000},
            // {id: 1, nama: 'google', harga: 200000},
            // {id: 2, nama: 'ebay', harga: 300000}
        ],

        currenItem: null,
        totalHarga: 0,
    }

    return{
        getItems : function(){
            return data.items;
        },
        addItem: function(nama, harga){
            // console.log(nama, harga);
            let ID;

            if(data.items.length > 0){
                ID = data.items[data.items.length -1].id +1;
            }else{
                ID = 0;
            }

            harga = parseInt(harga);

            newItem = new Item(ID, nama, harga);

            data.items.push(newItem);

            return newItem;
        },
        getTotalHarga: function(){
            let total = 0;

            //untuk looping item dan tambah class
            data.items.forEach(function(item){
                total += item.harga;
            });

            //untuk set total data
            data.totalHarga = total;

            //mengembalikan nilai total
            return data.totalHarga;
        },  
        logData: function(){
            return data;
        }
    }
})();

const UICtrl = (function(){
    const UISelector = {
        itemList: '#item-list',
        addBtn  : '.add-btn',
        itemNamaPaket : '#nama-paket',
        itemHargaPaket : '#harga-paket',
        totalHarga : '.total-harga'
    }
    return{
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.nama} : </strong><em>Rp. ${item.harga}</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil"></i>
                </a>
                </li>`;
            });

            document.querySelector(UISelector.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                nama  : document.querySelector(UISelector.itemNamaPaket).value,
                harga : document.querySelector(UISelector.itemHargaPaket).value 
            }
        },
        addListItem: function(item){

            document.querySelector(UISelector.itemList).style.display = 'block';
            const li = document.createElement('li');

            li.className = 'collection-item';

            li.id = `item-${item.id}`;

            li.innerHTML = `<strong>${item.nama} : </strong><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil"></i>
            </a>`;

        document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function(){
            document.querySelector(UISelector.itemNamaPaket).value = '';
            document.querySelector(UISelector.itemHargaPaket).value = '';
        },
        hideList: function(){
            document.querySelector(UISelector.itemList).style.display = 'none';
        },
        getSelectors: function(){
            return UISelector;
        }
        
    }
})();

const App = (function(ItemCtrl, UICtrl){

    const loadEventListener = function(){

        const UISelector = UICtrl.getSelectors();

        document.querySelector(UISelector.addBtn).addEventListener('click',itemAddSubmit);
    }

    const itemAddSubmit = function(e){
        const input = UICtrl.getItemInput(); 

        if(input.nama !== '' && input.harga !== ''){
            const newItem = ItemCtrl.addItem(input.nama,input.harga);

            UICtrl.addListItem(newItem);

            const totalHarga = ItemCtrl.getTotalHarga();

            //UTK MENAPILKAN TOTAL HARGA KE UI
            UICtrl.showTotalHarga(totalHarga);

            UICtrl.clearInput();
        }
        
        e.preventDefault();
    }

    return{
        init: function(){
            const items = ItemCtrl.getItems();

            if(items.length === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
            }
            loadEventListener();
        }
    }
})(ItemCtrl, UICtrl);

App.init();