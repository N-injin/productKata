# Product Kata

Nous sommes parti sur une implémentation d'une architecture hexagonale. Dans cette implémentation, 3 parties peuvent
être distinguées : Domain, Use Cases et Infrastructure.

## Domaine

La partie domaine contient les 3 objets suivant :

- User - Product - Order Chacune de ces classes implémente une interface qui permet d'abstraire les classes pour les 2
  autres parties. Elle contient aussi les interfaces des repertoires de donnée.

## Use cases

Les uses cases utiliseront les interfaces des répertoires afin d'abstraire la source de donnée. Chaque use case contient
le code métier qui lui est propre.

## Infrastructure

L'infrastructure contiendra un controller faisant appel aux différents use cases afin de faire le traitement métier.
Elle contiendra aussi des répertoires de donnée implémentant les interfaces du domaine. Ainsi, nous pourrons avoir
plusieurs sources de données (mémoire, fichier plat, base de donnée). Des adapters feront le lien entre les models de
données issues de la source de données et les models du domaine.

# Lancer la démo

Pour lancer la démo :

```sh
npm run start
```

Lancer les tests :

```
npm run test
npm run test:watch
npm run test:cov
```

Le point d'entrée ainsi que le bootstrap de l'application s'effectue dans le `src/main.ts`
Vous pouvez modifier ce fichier afin de tester d'autres valeurs. 