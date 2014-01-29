
(function($){

  var Renderer = function(elt){
    var dom = $(elt)
    var canvas = dom.get(0)
    var ctx = canvas.getContext("2d");
    var gfx = arbor.Graphics(canvas)
    var sys = null

    var _vignette = null
    var selected = null,
        nearest = null,
        _mouseP = null;
	
	
	var inactive=true;
	var animateSecID = 0;
	setInterval(automate, 5000);
    
    var sectionsArray = ['RESEARCH', 'WORKSHOP','Strategic Storyline', 'Marketing Plan', 'Brand Book'];
      
      function automate(){
      	if(inactive){
      		
      		
      		if(animateSecID==sectionsArray.length){
      			animateSecID=0;
      		}
      		
      		that.switchSection(sectionsArray[animateSecID]);
      		animateSecID=animateSecID+1;
      		
      	}
      }
    
    var that = {
      init:function(pSystem){
        sys = pSystem
        sys.screen({size:{width:dom.width(), height:dom.height()},
                    padding:[36,60,36,60]})

        $(window).resize(that.resize)
        that.resize()
        that._initMouseHandling()

      },
      resize:function(){
        canvas.width = $(window).width()
        canvas.height = $(window).height()-200
        sys.screen({size:{width:canvas.width, height:canvas.height}})
        _vignette = null
        that.redraw()
      },
      redraw:function(){
        gfx.clear()
        sys.eachEdge(function(edge, p1, p2){
          if (edge.source.data.alpha * edge.target.data.alpha == 0) return
          gfx.line(p1, p2, {stroke:"#222222", width:.4, alpha:edge.target.data.alpha})
        })
        sys.eachNode(function(node, pt){
          var w = Math.max(20, 20+gfx.textWidth(node.data.width) )
          if (node.data.alpha===0) return
          if (node.data.shape=='dot'){
            gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color, alpha:node.data.alpha})
            
            if(node.data.value){
           		 var lines = node.data.value.split("\n");
       			gfx.text(lines[0], pt.x, pt.y+2, {color:"white", align:"center", font:"franklin-gothic-urw", size:14})
      	 		gfx.text(lines[1], pt.x, pt.y+14, {color:"white", align:"center", font:"franklin-gothic-urw", size:14})
            }else{
           		gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"franklin-gothic-urw", size:12})
            }
          }else{
            gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color, alpha:node.data.alpha})
            
            if(node.data.value){
            	var lines = node.data.value.split("\n");
           		gfx.text(lines[0], pt.x, pt.y+-2, {color:"white", align:"center", font:"franklin-gothic-urw", size:12})
          	 	gfx.text(lines[1], pt.x, pt.y+11, {color:"white", align:"center", font:"franklin-gothic-urw", size:12})
            }else{
            	 var lines = node.name;
            	 gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"franklin-gothic-urw", size:12})
            }
          }
        })
      },
		
      switchMode:function(e){
        if (e.mode=='hidden'){
          dom.stop(true).fadeTo(e.dt,0, function(){
            if (sys) sys.stop()
            $(this).hide()
          })
        }else if (e.mode=='visible'){
          dom.stop(true).css('opacity',0).show().fadeTo(e.dt,1,function(){
            that.resize()
          })
          if (sys) sys.start()
        }
      },
      
      switchSection:function(newSection){
        var parent = sys.getEdgesFrom(newSection)[0].source
        var children = $.map(sys.getEdgesFrom(newSection), function(edge){
          return edge.target
        })
        
        sys.eachNode(function(node){
          if (node.data.shape=='dot') return // skip all but leafnodes

          var nowVisible = ($.inArray(node, children)>=0)
          var newAlpha = (nowVisible) ? 1 : 0
          var dt = (nowVisible) ? .5 : .5
          sys.tweenNode(node, dt, {alpha:newAlpha})

          if (newAlpha==1){
            node.p.x = parent.p.x + .05*Math.random() - .025
            node.p.y = parent.p.y + .05*Math.random() - .025
            node.tempMass = .001
          }
        })
      },
      
      
    
      
      _initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1

        var _section = null

        var handler = {
          moved:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = sys.nearest(_mouseP);

            if (!nearest.node) return false

            if (nearest.node.data.shape!='dot'){
              selected = (nearest.distance < 50) ? nearest : null
            }else if ($.inArray(nearest.node.name, ['Brand Book','RESEARCH','Marketing Plan','Strategic Storyline', 'WORKSHOP']) >=0 ){
            	inactive=false;
              if (nearest.node.name!=_section){
                _section = nearest.node.name
                that.switchSection(_section)
              }
              dom.removeClass('linkable')
              window.status = ''
            }
            
            return false
          }


        }

        //$(canvas).mousedown(handler.clicked);
        $(canvas).mousemove(handler.moved);

      }
    }
    
    return that
  }
  
    	
      
  
  
  $(document).ready(function(){
    var CLR = {
      branch:"#424242",
      research:"#f5c300",
      strategic:"#ad172b",
      brand:"#f18903",
      workshop:'#0082cb',
      marketing:'#70a086'
    }

    var theUI = {
      nodes:{"Brand Book":{value:"BRAND\nBOOK", width:'BRANDING',color:CLR.branch, shape:"dot", alpha:1}, 
      			"IDENTITY":{color:CLR.brand, width:'IDENTITY', alpha:0},
      			"IMAGERY":{color:CLR.brand, width:'IMAGERY', alpha:0},
      			"GUIDELINES":{color:CLR.brand, width:'GUIDELINES', alpha:0},
      			"LANGUAGE":{color:CLR.brand, width:'LANGUAGE', alpha:0},
      			"BRAND ARCHITECTURE":{value:"BRAND\nARCHITECTURE", color:CLR.brand, width:'ARCHITECTURE', alpha:0},
      			"COLOUR PALETTE":{value:"COLOUR\nPALETTE", color:CLR.brand, width:'PALETTE', alpha:0},
      			
      			
      			
      			
             "Strategic Storyline":{value:"BRAND STRATEGY &\nSTORYLINE", width:'STRATEGICINDSAGS', color:CLR.branch, shape:"dot", alpha:1}, 
             "CUSTOMER PROFILES":{value:"CUSTOMER\nPROFILES",color:CLR.strategic, width:'CUSTOMER', alpha:0},
             "NARRATIVE":{color:CLR.strategic, width:'NARRATIVE', alpha:0},
             "DIFFERENTIATORS":{color:CLR.strategic, width:'DIFFERENTIATORS', alpha:0},
             "KEY MESSAGES":{value:"KEY\nMESSAGES",color:CLR.strategic, width:'MESSAGES', alpha:0},
             "POSITIONING":{color:CLR.strategic, width:'POSITIONING', alpha:0},

             "Marketing Plan":{value:"MARKETING\nPLAN", width:'MARKETING', color:CLR.branch, shape:"dot", alpha:1}, 
			"SOCIAL MEDIA":{value:"SOCIAL\nMEDIA", color:CLR.marketing, width:'SOCIAL', alpha:0},
			"ADVERTISING":{color:CLR.marketing, width:'ADVERTISING', alpha:0},
			"DIGITAL MEDIA":{value:"DIGITAL\nMEDIA",color:CLR.marketing, width:'DIGITAL', alpha:0},
			"FILM":{color:CLR.marketing, width:'FILM', alpha:0},
			"PRINT":{color:CLR.marketing, width:'PRINT', alpha:0},
			"PACKAGING":{color:CLR.marketing, width:'PACKAGING', alpha:0},
			"EVENTS":{color:CLR.marketing, width:'EVENTS', alpha:0},
			"ENVIRONMENTS":{color:CLR.marketing, width:'ENVIRONMENTS', alpha:0},


             "RESEARCH":{color:CLR.branch, width:'RESEARCH', shape:"dot", alpha:1},
             "SURVEYS":{color:CLR.research, width:'SURVEYS', alpha:0},
             "BRAND HISTORY":{value:"BRAND\nHISTORY",color:CLR.research, width:'HISTORY', alpha:0},
             "INSIGHT PANELS":{value:"INSIGHT\nPANELS", color:CLR.research, width:'INSIGHT', alpha:0},
             "TRENDS":{color:CLR.research, width:'TRENDS', alpha:0},
             "STRATEGIC CONVERSATIONS":{value:"STRATEGIC\nCONVERSATIONS", width:'CONVERSATIONS',color:CLR.research, alpha:0},
             "COMPETITIVE ANALYSIS":{value:"COMPETITIVE\nANALYSIS", color:CLR.research, width:'COMPETITIVE', alpha:0},
             "FOCUS GROUPS":{value:"FOCUS\nGROUPS", color:CLR.research, width:'GROUPS', alpha:0},
             "STAKEHOLDER ANALYSIS":{value:"STAKEHOLDER\nANALYSIS", color:CLR.research, width:'STAKEHOLDER', alpha:0},
             "FORECASTING":{color:CLR.research, width:'FORECASTING', alpha:0},

             "WORKSHOP":{width:'WORKSHOP', color:CLR.branch, shape:"dot", alpha:1},
             "VALUES":{color:CLR.workshop, width:'VALUES', alpha:0},
             "STORYTELLING":{color:CLR.workshop, width:'STORYTELLING', alpha:0},
             "MISSION":{color:CLR.workshop, width:'MISSION', alpha:0},
             "STAKEHOLDERENGAGEMENT":{value:"STAKEHOLDER\nENGAGEMENT",color:CLR.workshop, width:'ENGAGEMENT', alpha:0},
             "SHAREDVISION":{value:"SHARED\nVISION", color:CLR.workshop, width:'SHARED', alpha:0},
             "BRANDCULTURE":{value:"BRAND\nCULTURE", color:CLR.workshop, width:'CULTURE', alpha:0},
             
             
            },
      edges:{
        "WORKSHOP":{
          "RESEARCH":{length:.8},
          "VALUES":{},
          "STORYTELLING":{},
          "MISSION":{},
          "STAKEHOLDERENGAGEMENT":{},
          "SHAREDVISION":{},
          "BRANDCULTURE":{}

        },
        "Brand Book":{
        	"IDENTITY":{},
        	"IMAGERY":{},
        	"GUIDELINES":{},
        	"LANGUAGE":{},
        	"BRAND ARCHITECTURE":{},
        	"COLOUR PALETTE":{},
        	
           "Strategic Storyline":{length:.8},
          "Marketing Plan":{length:.8},
        },
        "Strategic Storyline":{
        	 "RESEARCH":{},
        	  "CUSTOMER PROFILES":{},
        	  "NARRATIVE":{},
        	  "DIFFERENTIATORS":{},
        	  "KEY MESSAGES":{},
        	  "POSITIONING":{},
               "Marketing Plan":{},
               "WORKSHOP":{}
               
        },
        "Marketing Plan":{
        	"SOCIAL MEDIA":{},
        	"ADVERTISING":{},
        	"DIGITAL MEDIA":{},
        	"FILM":{},
        	"PRINT":{},
        	"PACKAGING":{},
        	"EVENTS":{},
        	"ENVIRONMENTS":{},
        },
        "RESEARCH":{
       		 "Marketing Plan":{},
        	   "BRAND HISTORY":{},
              "INSIGHT PANELS":{},
              "SURVEYS":{},
              "TRENDS":{},
              "STRATEGIC CONVERSATIONS":{},
              "COMPETITIVE ANALYSIS":{},
              "FOCUS GROUPS":{},
              "STAKEHOLDER ANALYSIS":{},
              "FORECASTING":{}

              
              
              
        }
      }
    }

    var sys = arbor.ParticleSystem()
    sys.parameters({stiffness:300, repulsion:2000, gravity:true, dt:0.015})
    sys.renderer = Renderer("#sitemap")
    sys.graft(theUI)
    
  })
})(this.jQuery)