var instance = new Vue({
  el: "#app",
  data: {
    //Example Pantry//
    //structure : barcode, cat, name, brand, amount, measure, date
    pantry: [
      ["123", "Dairy", "Cheddar", "Colby", 500, "Grams", "24/12/23"],
      ["124", "Dairy", "Milk", "Pura", 1, "Litre", "22/12/23"],
      ["125", "Meat", "Mince", "Butcher", 1, "Kilogram", "22/11/23"],
      ["126", "Herb", "Oregano", "Homebrand", 150, "Grams", "22/12/23"],
      ["127", "Carbs", "Wholemeal loaf", "Helgas", 350, "Grams", "22/12/23"]
    ],
    //nagivation boolean//
    isDetails: true,


    //student details/pseudo log in variables//
    name: "",
    contact: "",
    prac: "",
    group: "",
    requiredDate: "",

    //student details boolean and array//
    detailsTaken: false,

    activeStudent: [],


    //item search variables//
    itemCategory: "",
    product: "",
    brand: "",
    amount: "",
    comments: "",
    searchCriteria: "",

    //arrays for items (lists)//
    shoppingList: [],
    orderFromPantry: [],
    orderFromStore: [],
    listForComparison:[]



  },
  methods: {
    saveDetails: function () {
      if (this.detailsTaken == false) {
        var name = this.name;
        var contact = this.contact;
        var prac = this.prac;
        var group = this.group;
        var date = this.requiredDate;
        if (
          name != "" &&
          contact != "" &&
          prac != "" &&
          group != "" &&
          date != ""
        ) {
          name = "Name: " + name;
          contact = "Contact: " + contact;
          prac = "Prac: " + prac;
          group = "Group: " + group;
          date = "Req. Date: " + date;
          this.activeStudent = [];
          this.activeStudent.push(name, contact, prac, group, date);
          this.detailsTaken = true;
          this.isDetails = false;
        } else {
          alert("All fields are required to continue");
        }
      } else {
        alert("Student details already taken");
      }
    },

    removeDetails: function () {
      this.name = "";
      this.contact = "";
      this.prac = "";
      this.group = "";
      this.requiredDate = "";
      this.activeStudent = [];
      this.clearOrder();
      this.goToDetails();
    },

    saveItem: function () {
      if (this.detailsTaken == true) {
        var itemCategory = this.itemCategory;
        var product = this.product;
        var brand = this.brand;
        var amount = this.amount;
        var comments = this.comments;
        var listItem = [];
        var listElements = []
        if (
          itemCategory != "" &&
          product != "" &&
          brand != "" &&
          amount != ""
        ) {
          listElements.push(itemCategory, product, brand, amount, comments);
          itemCategory = "Category: " + itemCategory;
          product = "Product: " + product;
          brand = "Brand: " + brand;
          amount = "Amount: " + amount;
          comments = "Comments: " + comments;
          listItem.push(itemCategory, product, brand, amount, comments);
          this.listForComparison.push(listElements);
          this.shoppingList.push(listItem);
          this.itemCategory = "";
          this.product = "";
          this.brand = "";
          this.amount = "";
          this.comments = "";
        } else {
          alert("Fill all mandatory fields (All except comments)");
        }
      } else {
        alert("Cannot process without users details");
      }
    },

    clearOrder: function () {
      this.shoppingList = [];
      this.listForComparison= [];
    },

    saveOrder: function () {
      for(var i = 0; i < this.listForComparison.length; i++){
        var tempItem = this.listForComparison[i][1].toLowerCase();
        var taken= false
        for(var j = 0; j < this.pantry.length; j++){
          if(tempItem == this.pantry[j][2].toLowerCase()){           
            this.orderFromPantry.push(this.shoppingList[i])
            taken = true;
          }
          if(taken== false && j == (this.pantry.length -1)){
              this.orderFromStore.push(this.shoppingList[i])
          }
            
          }
        } 
      },

    goToDetails: function () {
      this.isDetails = true;
      this.detailsTaken = false;
    }
  }
});