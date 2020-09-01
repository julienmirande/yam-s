function creerTableau(){
  var grille = document.getElementById("grille");
  grille.style.borderCollapse = "collapse";
  for (var i = 1; i < 19; i++) {
    var ligne = document.createElement('tr');
      ligne.style.border= "1px solid black";
      ligne.style.height = "25px";

    for (var j = 0; j < 3; j++) {
      var col = document.createElement('td');
        col.style.border = "1px solid black";
        col.style.width = "50px";
        col.id = "case" + (i*+j) ;
        ligne.appendChild(col);

    }
    grille.appendChild(ligne);
  }
}
