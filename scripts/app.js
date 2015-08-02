$(function(){
    // State Model
    var State = Backbone.Model.extend();
    
    // StateScollection
    var StateScollection = Backbone.Collection.extend({
        model: State,
        url: "data/states.json"
    });
    
    // instantiate StateScollection
    var Library = new StateScollection;
     Library.comparator = function(product) {
    return parseFloat(product.get("stateID"));
	};
	Library.sortmethod();
	
	var StatEview = Backbone.View.extend({
		// we will create new element, so use tagName
		tagName: "li",
		el: $("#app"),
		events: {
			"click a[item-action=sorting]": "sort",
			"click a#submit": "Search"			
		},

		// our template for state view
		template: _.template($("#state-template").html()),
	    template_list: _.template($("#library-template").html()),
		
		initialize: function() {
			// something to do on startup?
			 this.on('sortmethod', this.sort);
			 // bind addOne, addAll and render functions to this object
			_.bindAll(this, 'render', 'addOne', 'addAll');
				
			this.render();     

			Library.bind('add', this.addOne, this);
			Library.bind('reset', this.addAll, this);			
							
			Library.fetch();
		}, 
		
		render: function() {
			this.$el.html( this.template({ model: this.model }) );
			return this;
		},
		addAll: function(collection) {
			collection.each(this.addOne);
		},
		
		addOne: function(stateparam) {
			var view = new StatEview({model: stateparam});
			this.$("ul#states-list").append( view.render().el );
		},
		sort: function() {
			console.log('After sorting state by name', this.pluck('statename'));
			//Add mixin class from css.
			this.$el.addClass("mixin1");
            this.model.sort();
        },
		Search: function() {
			var val_title = this.$("input[name=title]").val();
            this.model.set({
                title: val_title,
                author: val_author
            });

            if (! this.model.hasChanged() )
                this.render();
		}
		
	});
});
