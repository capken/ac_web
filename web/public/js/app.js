var brands = {
  '3M' : '3M/菲尔萃',
  'Coway' : 'Coway/熊津',
  'IQAir' : 'IQAir',
  'LG' : 'LG',
  'SKG' : 'SKG',
  'TCL' : 'TCL',
  'cado' : 'cado',
  '三星' : '三星/Samsung',
  '三菱重工' : '三菱重工',
  '东芝' : '东芝/TOSHIBA',
  '亚都' : '亚都',
  '伊莱克斯' : '伊莱克斯/Electrolux',
  '双鸟' : '双鸟/TwinBird',
  '夏普' : '夏普/SHARP',
  '大金' : '大金/DAIKIN',
  '奔腾' : '奔腾/POVOS',
  '奥司汀' : '奥司汀',
  '奥得奥' : '奥得奥/Airdow',
  '奥郎格' : '奥郎格/Airgle',
  '布鲁雅尔' : '布鲁雅尔/Blueair',
  '席爱尔' : '席爱尔',
  '德龙' : '德龙/DeLonghi',
  '惠而浦' : '惠而浦/Whirlpool',
  '松下' : '松下/Panasonic',
  '格力' : '格力/GREE',
  '汇清' : '汇清',
  '海尔' : '海尔/Haier',
  '爱国者' : '爱国者',
  '爱普乐' : '爱普乐/Airpal',
  '瑞士风' : '瑞士风/AIR-O-SWISS',
  '纽贝尔' : '纽贝尔',
  '绿歌' : '绿歌',
  '美的' : '美的/Midea',
  '美菱' : '美菱',
  '艾美特' : '艾美特/Airmate',
  '范罗士' : '范罗士/FELLOWS',
  '莱克' : '莱克',
  '西屋' : '西屋/Westinghouse',
  '贝昂' : '贝昂',
  '远大' : '远大',
  '霍尼韦尔' : '霍尼韦尔/Honeywell',
  '飞利浦' : '飞利浦/Philips',
  '龙禹' : '龙禹',
};


var Product = Backbone.Model.extend({
  urlRoot: "products"
});

var Products = Backbone.Collection.extend({
  url: function() {
    var paramsStr = _.map(this.params, function(value, key){
      return key + "=" + value;
    }).join("&");

    return "/products?" + paramsStr;
  },

  params: {
    page: 1,
    mode: "suggest",
    city: "上海",
    made_in: "home-make",
    room_area: 15,
    air_refresh_count: 5
  },

  parse: function(resp, xhr) {
    return resp.products;
  }
});

var SuggestView = Backbone.View.extend({
  template: _.template( $("#suggest_template").html() ),

  render: function() {
    this.$el.html(this.template({
      params: this.collection.params
    }));
    return this.el;
  },

  events: {
    "click button": "suggest"
  },

  suggest: function(event) {
    var params = this.collection.params;
    this.$('.form-control').each(function(i, el) {
      if($(el).val()!= '') {
        params[el.id] = $(el).val();
      }
    });

    this.collection.fetch({
      success: function(model) {
        router.navigate("products", true);
      }
    });
  }
});

var ProductsView = Backbone.View.extend({
  template: _.template($("#results_template").html()),

  render: function() {
    this.$el.html(this.template({
      products: this.collection.models
    }));
    return this.el;
  }
});

var productDetailsView = Backbone.View.extend({
  template: _.template($("#product_template").html()),

  render: function() {
    this.$el.html(this.template({product: this.model}));
    return this.el;
  }
});

var AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.products = new Products();
  },

  routes: {
    "suggest"     : "showSuggestText",
    "products"    : "showProducts",
    "products/:id": "showProduct"
  },

  showSuggestText: function() {
    this.updateView("#content",
      new SuggestView({
        collection: this.products
    }));
    console.log("show suggest text");
  },

  showProducts: function() {
    this.updateView("#content",
      new ProductsView({
        collection: this.products
    }));
    console.log("show search results");
  },

  showProduct: function(id) {
    var that = this;
    var product = new Product({id: id});
    product.fetch({
      success: function(product) {
        that.updateView("#content",
          new productDetailsView({model: product}));
      }
    });
    console.log("show product details");
  },

  updateView: function(selector, view) {
    if(this.currentView) {
      this.currentView.remove();
    }

    $(selector).html(view.render());
    Holder.run();
    this.currentView = view;
  }

});

var router = new AppRouter();
Backbone.history.start();
