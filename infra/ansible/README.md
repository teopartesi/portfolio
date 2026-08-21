# Ansible Infrastructure

Ce dossier contient la configuration Ansible utilisée pour automatiser progressivement la préparation de l'infrastructure et le déploiement du portfolio.

## Objectifs

Ansible permettra notamment de :

* préparer la VPS Scaleway ;
* installer et configurer Docker ;
* créer les dossiers nécessaires dans `/opt/docker` ;
* créer les réseaux Docker ;
* déployer Traefik ;
* déployer le portfolio ;
* rendre la configuration de la VPS reproductible et versionnée.

## Architecture

```text
WSL
Control node
    │
    │ Ansible + SSH
    ▼
VPS Scaleway
Managed node
    │
    ▼
Docker
    │
    ├── Traefik
    └── Portfolio
```

Ansible est installé sur le control node. La machine distante est administrée à travers une connexion SSH.

## Structure

```text
infra/ansible/
├── ansible.cfg
├── inventories/
│   └── local/
│       └── hosts.ini
├── playbooks/
│   └── bootstrap-local.yml
└── README.md
```

## Configuration locale

L'inventaire local permet de tester Ansible directement dans l'environnement WSL sans modifier la VPS de production.

```ini
[local]
localhost ansible_connection=local
```

## Commandes principales

Les commandes doivent être exécutées depuis le dossier `infra/ansible`.

### Afficher l'inventaire

```bash
ansible-inventory --graph
```

### Tester la communication

```bash
ansible local -m ansible.builtin.ping
```

### Exécuter le playbook local

```bash
ansible-playbook playbooks/bootstrap-local.yml
```

### Afficher la configuration active

```bash
ansible-config dump --only-changed
```

## Idempotence

Un playbook Ansible décrit un état désiré.

Lors de la première exécution, Ansible applique les modifications nécessaires. Lors des exécutions suivantes, aucune modification n'est effectuée si la machine correspond déjà à l'état demandé.

Exemple :

```text
Première exécution  : changed=2
Deuxième exécution : changed=0
```

## Sécurité

Les inventaires, playbooks et fichiers de configuration peuvent être versionnés.

Les éléments suivants ne doivent jamais être ajoutés directement au repository :

* clés SSH privées ;
* mots de passe ;
* tokens GitHub ;
* secrets de production ;
* fichiers Ansible Vault non chiffrés.

## Prochaines étapes

* ajouter un inventaire de production ;
* tester la connexion SSH avec la VPS ;
* collecter les facts de la VPS ;
* préparer les dossiers de déploiement ;
* automatiser l'installation et la configuration de Docker.
