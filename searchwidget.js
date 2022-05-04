$(document).ready(function(){
  var primoBase = 'https://alliance-lclark.primo.exlibrisgroup.com/discovery/search?';
  var wcBase="https://watzek.on.worldcat.org/search?";
  var boleyWcBase = "https://lewisclarklaw.on.worldcat.org/search?";

  $(".swSubmit").click(function(){

    var tab=$(this).attr("id");
    var q=$(this).parent("div").siblings("input[name='q']").val();
    var query = q.replace(",", " ");
    switch(tab){

      case "primoTab":

        var kw="any,contains,"+query
        var opts = { "institution":"01ALLIANCE_LCC","vid":"01ALLIANCE_LCC:LCC","query":kw, "tab": "Everything", "search_scope":"EVERYTHING", "lang":"en_US" };
        var getParams = jQuery.param(opts);
        var targetUrl=primoBase+getParams;
        window.location.replace(targetUrl);
      break;

      case "booksTab":

        var scope=$("input[name='scope']:checked").val();
        var idx=$("select[name='index']").children("option:selected"). val();
        if(scope=="worldcat"){
          var wcidx={"any":"kw", "title":"ti","creator":"au","sub":"su"}
          var i=wcidx[idx];
          var qString=i+":"+query;
          var opts={"queryString":qString}
          var lib=$(".searchwidget").attr("id");
          var getParams = jQuery.param(opts);
          if(lib=="watzek"){
            var targetUrl=wcBase+getParams;
            window.location.replace(targetUrl);

          }
          if(lib=="boley"){
            var targetUrl=boleyWcBase+getParams;
            window.location.replace(targetUrl);

          }

        }
        else{
          if(scope=="MyInstitution"){tab="LC";}
          if(scope=="SUMMIT"){tab="Summit";}


          var bookQ=idx+",contains,"+query
          var opts = { "institution":"01ALLIANCE_LCC","vid":"01ALLIANCE_LCC:LCC","query":bookQ, "tab":tab, "search_scope":scope, "lang":"en_US" };
          var getParams = jQuery.param(opts);
          var targetUrl=primoBase+getParams;
          window.location.replace(targetUrl);
        }

      break;

      case "eonlyTab":
        var kw="any,contains,"+query
        var opts = { "institution":"01ALLIANCE_LCC","vid":"01ALLIANCE_LCC:LCC","query":kw, "tab":"EResources", "search_scope":"EResources", "lang":"en_US" };
        var getParams = jQuery.param(opts);
        var targetUrl=primoBase+getParams;
          window.location.replace(targetUrl);

      break;


      case "articlesTab":
        var kw="any,contains,"+query
        var opts = { "institution":"01ALLIANCE_LCC","vid":"01ALLIANCE_LCC:LCC","query":kw, "tab":"Everything","search_scope":"EVERYTHING", "lang":"en_US" };
        var getParams = jQuery.param(opts);
        var targetUrl=primoBase+getParams+"&mfacet=rtype,include,articles,1&mfacet=rtype,include,newspaper_articles,1";
        window.location.replace(targetUrl);
      break;

      case "journalsTab":
        var kw="title,contains,"+query
        var opts = { "institution":"01ALLIANCE_LCC","vid":"01ALLIANCE_LCC:LCC","query":kw, "tab":"LC","search_scope":"MyInstitution", "lang":"en_US" };
        var getParams = jQuery.param(opts);
        var targetUrl=primoBase+getParams+"&mfacet=rtype,include,journals,1&mfacet=rtype,include,newspapers,1";
        window.location.replace(targetUrl);
      break;

    }

    return false;

  });

});
