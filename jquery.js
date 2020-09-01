var tabDes = null;
var yahtzeeDejaEffectue = false;
var nbJoueurs = 2;
var joueurCourant = 1;
var nbLancers = 0;
var nbCasesRempliesParJoueur = 0;
var nbYahtzeeJ1 = 0;
var nbYahtzeeJ2 = 0;

$(document).ready(function(){
  // Lancer de des
  tabDes = [0,0,0,0,0];
  genererImg();

  initialiserCasesGrises();

  $('#boutonLancer').on('click',function(){
    if ( nbLancers  < 3)
    {
      genererImg();
      incrementerProgressBar();
    }
  });

});


function initialiserCasesGrises()
{
  for (var joueur=1;joueur<=2;joueur++)
  {
    $("#j"+joueur+"_total").addClass("caseGrise");
    $("#j"+joueur+"_prime").addClass("caseGrise");
    $("#j"+joueur+"_totalSup").addClass("caseGrise");
    $("#j"+joueur+"_totalInf").addClass("caseGrise");
    $("#j"+joueur+"_totalSup2").addClass("caseGrise");
    $("#j"+joueur+"_totalGeneral").addClass("caseGrise");
  }

}

function incrementerProgressBar()
{

  nbLancers++;
  var largeur = 0;
  switch (nbLancers) {
    case 1:
    largeur = 33;
    break;
    case 2:
    largeur = 66;
    break;
    case 3:
    largeur = 100;
    break;
  }


  if (nbLancers == 1)
  {
    for (var i = 1; i < 6; i++) {
      $("#De"+i).on('click', function() {
        verrouillerDe(this);
      });

    }



  }


  $('.progress-bar').css('width', largeur + '%').attr('aria-valuenow', largeur);
  $('.progress-bar').text("Lancer "+nbLancers);

  afficherPossibilites();
}


function resetPossibilites()
{
  for (var i = 1; i < 7; i++) {
    if ($("#j"+joueurCourant+"_"+i).hasClass("enAttente"))
    {
      $("#j"+joueurCourant+"_"+i).removeClass("enAttente");
      $("#j"+joueurCourant+"_"+i).text("").css('text-align',"center").css("color",'black').css("border-color","black");
      $("#j"+joueurCourant+"_"+i).off();
    }
  }

  if ($("#j"+joueurCourant+"_brelan").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_brelan").removeClass("enAttente");
    $("#j"+joueurCourant+"_brelan").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_brelan").off();
  }

  if ($("#j"+joueurCourant+"_carre").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_carre").removeClass("enAttente");
    $("#j"+joueurCourant+"_carre").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_carre").off();
  }

  if ($("#j"+joueurCourant+"_full").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_full").removeClass("enAttente");
    $("#j"+joueurCourant+"_full").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_full").off();
  }

  if ($("#j"+joueurCourant+"_petiteSuite").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_petiteSuite").removeClass("enAttente");
    $("#j"+joueurCourant+"_petiteSuite").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_petiteSuite").off();
  }

  if ($("#j"+joueurCourant+"_grandeSuite").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_grandeSuite").removeClass("enAttente");
    $("#j"+joueurCourant+"_grandeSuite").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_grandeSuite").off();
  }

  if ($("#j"+joueurCourant+"_yahtzee").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_yahtzee").removeClass("enAttente");
    $("#j"+joueurCourant+"_yahtzee").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_yahtzee").off();
  }

  if ($("#j"+joueurCourant+"_chance").hasClass("enAttente"))
  {
    $("#j"+joueurCourant+"_chance").removeClass("enAttente");
    $("#j"+joueurCourant+"_chance").text("").css('text-align',"center").css("color",'black').css("border-color","black");
    $("#j"+joueurCourant+"_chance").off();
  }



}

function changerJoueur()
{

  nbLancers = 0;
  $('.progress-bar').css('width', '0%').attr('aria-valuenow', '0');
  $('.progress-bar').text("");
  joueurCourant++;


  for (var i = 1; i < 6; i++) {
    if ( nbLancers < 1)
    {
      $("#De"+i).off();
    }


  }
  if ( joueurCourant>nbJoueurs)
  {
    nbCasesRempliesParJoueur++;
    joueurCourant = 1;
  }
  for (var i = 1; i < 6; i++) {
    if ($("#De"+i).hasClass("verrouiller"))
    {
      $("#De"+i).removeClass("verrouiller");

    }
  }
  $("#texte").text("Joueur "+joueurCourant+" c'est ton tour !")

  if ( finDePartie())
  {
    var text = "";
    if ($("#j1_totalGeneral").text() > $("#j2_totalGeneral").text())
    {
      text = "Jouer 1 vainqueur";
    }
    else {
      text = "Jouer 2 vainqueur";
    }
    $("#texte").text(text);

  }



}



function sommeDes()
{
  var somme = 0;
  for(var i=0;i<tabDes.length;i++)
  {
    somme += tabDes[i];
  }
  return somme;
}

function calculerTotalHautTemp()
{

  var total = 0;
  for (var i = 1; i < 7; i++) {

    if ($("#j"+joueurCourant+"_"+i).hasClass("valide"))
    {
      total = total + parseInt($("#j"+joueurCourant+"_"+i).text());
    }
  }
  $("#j"+joueurCourant+"_total").text(total).css("text-align","center");
  return total;
}

function possedeBonusHaut(total)
{
  if (total >= 63 )
  {
    $("#j"+joueurCourant+"_prime").text(35).css("text-align","center");
    return true;
  }
  return false;

}


function calculerTotalPartieSuperieure()
{
  var total = calculerTotalHautTemp();
  if ( possedeBonusHaut(total))
  {
    total = 35 + total;
    $("#j"+joueurCourant+"_totalSup").text(total).css("text-align","center");
    $("#j"+joueurCourant+"_totalSup2").text(total).css("text-align","center");
  }
  return total;

}

function calculerTotalPartieInferieure()
{
  var totalInf = 0;

  if ($("#j"+joueurCourant+"_brelan").hasClass("valide") )
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_brelan").text());
  }

  if ($("#j"+joueurCourant+"_carre").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_carre").text());
  }

  if ($("#j"+joueurCourant+"_full").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_full").text());
  }

  if ($("#j"+joueurCourant+"_petiteSuite").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_petiteSuite").text());
  }

  if ($("#j"+joueurCourant+"_grandeSuite").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_grandeSuite").text());
  }

  if ($("#j"+joueurCourant+"_yahtzee").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_yahtzee").text());
  }

  if ($("#j"+joueurCourant+"_chance").hasClass("valide"))
  {
    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_chance").text());
  }

  if ($("#j"+joueurCourant+"_primeY").hasClass("valide"))
  {

    totalInf = totalInf + parseInt($("#j"+joueurCourant+"_primeY").text());
  }

  $("#j"+joueurCourant+"_totalInf").text(totalInf).css("text-align","center");


  return totalInf;

}

function calculerTotalGeneral()
{
  var totalInf = calculerTotalPartieInferieure();
  $("#j"+joueurCourant+"_totalInf").text(totalInf).css("text-align","center");
  var totalSup = calculerTotalPartieSuperieure();
  $("#j"+joueurCourant+"_totalSup2").text(totalSup).css("text-align","center");

  var totalGeneral = totalInf + totalSup;
  $("#j"+joueurCourant+"_totalGeneral").text(totalGeneral).css("text-align","center");

}


function afficherPossibilites()
{


  if (isYahtzee())
  {
    setYahtzee(joueurCourant);
  }
  for (var i = 1; i < 7; i++) {

    if (!$("#j"+joueurCourant+"_"+i).hasClass("valide"))
    {
      $("#j"+joueurCourant+"_"+i).addClass("enAttente");
      $("#j"+joueurCourant+"_"+i).text(totalValeur(i)*i).css('text-align',"center").css("color",'red').css("border-color","red");
      $("#j"+joueurCourant+"_"+i).on('click', function() {
        $(this).attr('class', 'valide');
        $(this).text(totalValeur(i)).css('text-align',"center").css("color",'black').css("border-color","black");
        $(this).off();
        resetPossibilites();
        calculerTotalGeneral();
        changerJoueur();
      });
    }
  }


  if (!$("#j"+joueurCourant+"_brelan").hasClass("valide") )
  {
    var value = 0;
    if ( isBrelan())
    {
      value = sommeDes();
    }
    else {
      value = 0;
    }

    $("#j"+joueurCourant+"_brelan").addClass("enAttente");
    $("#j"+joueurCourant+"_brelan").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_brelan").on('click', function() {
      if ( isBrelan())
      {
        value = sommeDes();
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });

  }

  if (!$("#j"+joueurCourant+"_carre").hasClass("valide") )
  {
    var value = 0;
    if ( isCarre())
    {
      value = sommeDes();
    }
    else {
      value = 0;
    }

    $("#j"+joueurCourant+"_carre").addClass("enAttente");
    $("#j"+joueurCourant+"_carre").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_carre").on('click', function() {
      if ( isCarre())
      {
        value = sommeDes();
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

  if (!$("#j"+joueurCourant+"_full").hasClass("valide")   )
  {
    var value = 0;
    if ( isFull())
    {
      value = 25;
    }
    else {
      value = 0;
    }

    $("#j"+joueurCourant+"_full").addClass("enAttente");
    $("#j"+joueurCourant+"_full").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_full").on('click', function() {
      if ( isFull())
      {
        value = 25;
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

  if (!$("#j"+joueurCourant+"_petiteSuite").hasClass("valide"))
  {
    var value = 0;
    if ( isPetiteSuite())
    {
      value = 30;
    }
    else {
      value = 0;
    }



    $("#j"+joueurCourant+"_petiteSuite").addClass("enAttente");
    $("#j"+joueurCourant+"_petiteSuite").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_petiteSuite").on('click', function() {

      if ( isPetiteSuite())
      {
        value = 30;
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

  if (!$("#j"+joueurCourant+"_grandeSuite").hasClass("valide")  )
  {
    var value = 0;
    if ( isGrandeSuite())
    {
      value = 40;
    }
    else {
      value = 0;
    }

    $("#j"+joueurCourant+"_grandeSuite").addClass("enAttente");
    $("#j"+joueurCourant+"_grandeSuite").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_grandeSuite").on('click', function() {
      if ( isGrandeSuite())
      {
        value = 40;
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

  if (!$("#j"+joueurCourant+"_yahtzee").hasClass("valide")   )
  {
    var value = 0;
    if ( isYahtzee())
    {
      value = 50;
    }
    else {
      value = 0;
    }

    $("#j"+joueurCourant+"_yahtzee").addClass("enAttente");
    $("#j"+joueurCourant+"_yahtzee").text(value).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_yahtzee").on('click', function() {
      if ( isYahtzee())
      {
        value = 50;
      }
      else {
        value = 0;
      }
      $(this).attr('class', 'valide');
      $(this).text(value).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

  if (!$("#j"+joueurCourant+"_chance").hasClass("valide")   )
  {
    $("#j"+joueurCourant+"_chance").addClass("enAttente");
    $("#j"+joueurCourant+"_chance").text(sommeDes).css('text-align',"center").css("color",'red').css("border-color","red");
    $("#j"+joueurCourant+"_chance").on('click', function() {
      $(this).attr('class', 'valide');
      $(this).text(sommeDes).css('text-align',"center").css("color",'black').css("border-color","black");
      $(this).off();
      resetPossibilites();
      calculerTotalGeneral();
      changerJoueur();
    });
  }

}

function setYahtzee(j)
{
  switch (j) {
    case 1:
    nbYahtzeeJ1++;
    if (nbYahtzeeJ1 >=2)
    {
      $("#j"+joueurCourant+"_primeY").addClass("valide");
      $("#j"+joueurCourant+"_primeY").text(100).css("text-align","center");
    }
    break;
    case 2:
    nbYahtzeeJ2++;
    if (nbYahtzeeJ2 >=2)
    {
      $("#j"+joueurCourant+"_primeY").addClass("valide");
      $("#j"+joueurCourant+"_primeY").text(100).css("text-align","center");
    }
    break;
    default:

  }
}

function finDePartie()
{
  return ($("#j"+nbJoueurs+"_1").hasClass("valide") &&
  $("#j"+nbJoueurs+"_2").hasClass("valide") &&
  $("#j"+nbJoueurs+"_3").hasClass("valide") &&
  $("#j"+nbJoueurs+"_3").hasClass("valide") &&
  $("#j"+nbJoueurs+"_4").hasClass("valide") &&
  $("#j"+nbJoueurs+"_5").hasClass("valide") &&
  $("#j"+nbJoueurs+"_6").hasClass("valide") &&
  $("#j"+nbJoueurs+"_brelan").hasClass("valide") &&
  $("#j"+nbJoueurs+"_carre").hasClass("valide") &&
  $("#j"+nbJoueurs+"_full").hasClass("valide") &&
  $("#j"+nbJoueurs+"_petiteSuite").hasClass("valide") &&
  $("#j"+nbJoueurs+"_grandeSuite").hasClass("valide") &&
  $("#j"+nbJoueurs+"_yahtzee").hasClass("valide") &&
  $("#j"+nbJoueurs+"_chance").hasClass("valide") );

}




function imgAlea(){
  var nb = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  return("img/face"+nb+".png");


}

function genererImg(){


  for (var reroll=0;reroll<4;reroll++)
  {
    for (var i = 1; i < 6; i++) {
      if ( !$('#De'+i).hasClass('verrouiller') ) {
        $("#De"+i).attr("src",imgAlea());
        tabDes[i-1] = getValeur($("#De"+i).attr('src'));
      }
    }
  }


}

function verrouillerDe(de){
  $(de).toggleClass('verrouiller');
}

function getValeur(path){
  switch (path) {
    case "img/face1.png":
    return(1);
    break;
    case "img/face2.png":
    return(2);
    break;
    case "img/face3.png":
    return(3);
    break;
    case "img/face4.png":
    return(4);
    break;
    case "img/face5.png":
    return(5);
    break;
    case "img/face6.png":
    return(6);
    break;
    default:

  }
}

function remplirTabOcc(){

  var amount = [0,0,0,0,0,0];

  for(var i = 0; i < tabDes.length; i++ ) { // dices is your integer array
    switch( tabDes[i] ) {
      case 1: amount[0] += 1; break;
      case 2: amount[1] += 1; break;
      case 3: amount[2] += 1; break;
      case 4: amount[3] += 1; break;
      case 5: amount[4] += 1; break;
      case 6: amount[5] += 1; break;
    }
  }

  return amount;
}

function totalValeur(valeur)
{
  var amount = remplirTabOcc();
  var points = amount[valeur-1];
  return points;
}

function isBrelan(){
  var amount = remplirTabOcc();

  var got3same = false;
  for(var i = 0; i < amount.length && (!got3same); i++) {
    if(!got3same && amount[i] == 3) {
      got3same = true;
    }
  }

  if(got3same) {
    return true
  }
  else {
    return false;
  }
}

function isCarre(){
  var amount = remplirTabOcc();

  var got4same = false;
  for(var i = 0; i < amount.length && (!got4same); i++) {
    if(!got4same && amount[i] == 4) {
      got4same = true;
    }
  }

  if(got4same) {
    return true
  }
  else {
    return false;
  }
}

function isYahtzee(){
  var amount = remplirTabOcc();

  var got5same = false;
  for(var i = 0; i < amount.length && (!got5same); i++) {
    if(!got5same && amount[i] == 5) {
      got5same = true;
    }
  }

  if(got5same) {
    return true
  }
  else {
    return false;
  }
}

function isFull()
{
  var amount = remplirTabOcc();

  var got3same = false;
  var got2same = false;
  for(var i = 0; i < amount.length && (!got3same || !got2same); i++) {
    if(!got3same && amount[i] == 3) {
      got3same = true;
    } else if(!got2same && amount[i] == 2) {
      got2same = true;
    }
  }

  if(got3same && got2same) {
    return true
  }
  else {
    return false;
  }

}

function isPetiteSuite(){
  var amount = remplirTabOcc();

  var got4differentAfterAnother = false;
  for(var i = 0; i < 3 && (!got4differentAfterAnother); i++) {
    if(!got4differentAfterAnother && amount[i] >= 1 && amount[i+1] >= 1 && amount[i+2] >= 1 && amount[i+3] >= 1) {
      got4differentAfterAnother= true;
    }
  }

  if(got4differentAfterAnother) {
    return true
  }
  else {
    return false;
  }
}

function isGrandeSuite(){
  var amount = remplirTabOcc();

  var got5differentAfterAnother = false;
  for(var i = 0; i < 2 && (!got5differentAfterAnother); i++) {
    if(!got5differentAfterAnother && amount[i] >= 1 && amount[i+1] >= 1 && amount[i+2] >= 1 && amount[i+3] >= 1 && amount[i+4] >= 1) {
      got5differentAfterAnother= true;
    }
  }

  if(got5differentAfterAnother) {
    return true
  }
  else {
    return false;
  }
}
