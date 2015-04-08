#TP Systèmes multi-agents

Le but de l'exercice est de créer une équipe d'agent capable de marquer des points en tirant la balle dans les buts adverses.

Pour commencer
---------------

Après avoir récupéré le projet sur le dépôt github et installé [Lineman](http://linemanjs.com/), le projet peut être lancé avec la commande ``lineman run``

Afin de séparer votre code de la base du projet, vous pouvez créer un sous-dossier dans ``app/js/`` pour rajouter vos ficihiers.

L'objectif est de créer un ou plusieurs nouveaux types d'agent (vous pouvez vous inspirer de ``app/js/bot.js``) afin de composer votre équipe.

Pour déclarer votre équipe, modifiez dans le fichier ``app/js/init.js``  :

	   var team1 = new Team("team 1", [
		     {ratio: 1, agent: Bot }
	   ], AGENTS_BY_TEAM, 0xFF0000);

- ``"team 1"`` représente le nom de l'équiope.
- Le deuxième paramètre est un tableau décrivant la composition de l'équipe : ``ratio`` est la part des agents de l'équipe étant de la classe renseignée dans ``agent``. Dans l'exemple 100% de l'équipe est de la classe ``Bot``.
- ``AGENTS_BY_TEAM`` est le nombre total d'agents dans l'équipe.
- Le dernier paramètre est la couleur des agents.


Règles
------
1. Les agents sont initialisés à une position aléatoire, sans connaître la position des buts. Ceux-ci sont représentés par les agents de type ``GoalPost`` (poteau) et ``GoalTarget`` (filet). La méthode ``getTeam()`` permet de savoir à quelle équipe ils correspondent. Le ballon est initialisé au centre.
2. Lorsqu'un but est marqué, les agents sont renvoyés dans une position aléatoire et la balle est remise au centre, mais leur mémoire n'est pas effacée.
3. Après une seconde, la balle est automatiqument relâchée.
4. Les agents peuvent communiquer lorsqu'ils sont dans leeur rayon de perception.
5. Les agents n'ont pas de mémoire partagée.