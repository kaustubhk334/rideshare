 App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */
    if (typeof web3 != 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */
    $.getJSON('RideShare.json', function(rideshare) {
      App.contracts.RideShare = TruffleContract(rideshare);
      App.contracts.RideShare.setProvider(App.web3Provider); 
      
    }).done(function() {
      // return App.listenForEvents();
      return App.render();
    })

    
  },

  render: function() {
    var rideshareIstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
        
      }
    });

    // Load contract data
    App.contracts.RideShare.deployed().then(function(instance) {
      rideshareInstance = instance;
      $("#ridesCount").html("Rides Count: " + rideshareInstance.ridesCount());
      return rideshareInstance.ridesCount();
    }).then(function(ridesCount) {
      var ridesResults = $("#ridesResults");
      ridesResults.empty();

      console.log('ridesCount', ridesCount);
      for (var i = 1; i <= ridesCount; i++) {
        rideshareInstance.rides(i).then(function(ride) {
          var id = ride[0];
          var from = ride[1];
          var to = ride[2];
          console.log(from)

          // Render candidate Result
          var rideTemplate = "<tr><th>" + id + "</th><td>" + from + "</td><td>" + to + "</td><td>";
          ridesResults.append(rideTemplate);
        });
      }
      loader.hide();
      content.show()
    }).catch(function(error) {
      console.warn(error);
    });
    
  },

  addRide: function() {
    // var from = $('from_input').value;
    // var to = $('to_input').value;

    var addRideForm = document.getElementById("addRideForm");

    App.contracts.RideShare.deployed().then(function(instance) {
      var from = addRideForm.elements[0];
      var to = addRideForm.elements[1];
      
      return instance.addRide(from.value, to.value, {from: App.account});
    }).then(function(result){
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.log(err);
    });
  },

  listenForEvents: function() {
    App.contracts.RideShare.deployed().then(function(instance) {
      instance.NewRideEvent({}, {
        fromBlock: 0, 
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log('event triggered', event);
        App.render();
      })
    })
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
