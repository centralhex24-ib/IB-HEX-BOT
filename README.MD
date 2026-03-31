# 🤖 IB-HEX-BOT - WhatsApp Bot Complet

<div align="center">
  <img src="https://i.ibb.co/S4Bq8FGC/file-0000000019fc722f9717382cd6600e56.png" alt="IB-HEX-BOT Logo" width="200">
  <h3>Bot WhatsApp Puissant avec 150+ Commandes</h3>
  <p>Développé par <strong>IbSacko</strong> (ibrahima sory sacko)</p>
</div>

---

## 📱 Caractéristiques

- ✅ **150+ Commandes** fonctionnelles
- ✅ **QR Code Web** - Connexion facile via navigateur
- ✅ **100% Gratuit** - Aucune API payante requise
- ✅ **Fonctionne sur Android** - Via GitHub + Replit/Heroku
- ✅ **Multi-fonctions** - Groupes, IA, Conversion, Recherche
- ✅ **Personnalisable** - Préfixe, Nom, Propriétaire

---

## 🚀 Installation sur Android (Sans PC)

### Méthode 1: GitHub + Replit (Recommandé)

1. **Créer un compte GitHub**
   - Télécharge l'app GitHub sur Android
   - Crée un compte si tu n'en as pas

2. **Fork ce dépôt**
   - Clique sur "Fork" en haut à droite
   - Le code est copié sur ton compte

3. **Utiliser Replit**
   - Ouvre [replit.com](https://replit.com) dans ton navigateur
   - Crée un compte
   - Clique sur "Import from GitHub"
   - Entre l'URL de ton fork
   - Replit installe automatiquement les dépendances

4. **Démarrer le bot**
   - Clique sur "Run"
   - Une URL apparaît (ex: https://ton-projet.username.repl.co)
   - Ouvre cette URL dans ton navigateur
   - Scanne le QR Code avec WhatsApp

### Méthode 2: GitHub + Termux (Alternative)

```bash
# Installer Termux depuis F-Droidpkg update && pkg upgrade
pkg install nodejs git
git clone https://github.com/ton-username/IB-HEX-BOT
cd IB-HEX-BOT
npm install
npm start
```

---

## 📋 Commandes Disponibles

###  Menu Principal
- `Ibmenu` - Afficher le menu complet
- `Ibalive` - Vérifier si le bot est en ligne
- `Ibdev` - Informations développeur
- `Iballvar` - Toutes les variables
- `Ibping` - Tester la vitesse
- `Ibowner` - Contact propriétaire

### 👑 Owner Commands
- `Ibjoin [lien]` - Rejoindre un groupe
- `Ibleave` - Quitter un groupe
- `Ibantidelete on/off` - Anti-suppression
- `Ibupload` - Téléverser un média
- `Ibvv` - Voir les messages à vue unique
- `Iballcmds` - Liste toutes les commandes
- `Ibdelete` - Supprimer un message
- `Ib🥷` - Télécharger en privé (remplace vv2)
- `Ibrepo` - Lien GitHub

### 🤖 Intelligence Artificielle
- `Ibai [question]` - IA générale
- `Ibbug [message]` - Signaler un bug
- `Ibbot` - Informations du bot
- `Ibgemini [question]` - Google Gemini
- `Ibchatbot [message]` - Discussion IA
- `Ibgpt [question]` - ChatGPT

### 🔄 Convertisseur
- `Ibattp [texte]` - Texte en sticker animé
- `Ibtoimage` - Sticker → Image
- `Ibgimage [recherche]` - Image Google
- `Ibmp3` - Vidéo → Audio MP3
- `Ibss [url]` - Capture d'écran site web
- `Ibfancy [texte]` - Texte stylisé
- `Iburl` - Obtenir lien de téléchargement
- `Ibsticker` - Image/Vidéo → Sticker
- `Ibtake` - Voler un sticker
### 🔍 Recherche
- `Ibgoogle [recherche]` - Recherche Google
- `Ibplay [chanson]` - Télécharger musique
- `Ibvideo [nom]` - Télécharger vidéo
- `Ibsong [chanson]` - Musique en document
- `Ibmediafire [lien]` - Télécharger MediaFire
- `Ibfacebook [lien]` - Télécharger Facebook
- `Ibinstagram [lien]` - Télécharger Instagram
- `Ibtiktok [lien]` - Télécharger TikTok
- `Iblyrics [chanson]` - Paroles
- `Ibimage [recherche]` - Images Pinterest

### 🎮 Divertissement
- `Ibgetpp` - Photo de profil
- `Ibgoodnight` - Bonne nuit
- `Ibwcg` - Classement admins
- `Ibquizz` - Quiz aléatoire
- `Ibanime` - Image anime aléatoire
- `Ibprofile` - Voir profil
- `Ibcouple` - Couple PP
- `Ibpoll question|opt1|opt2` - Créer sondage
- `Ibemojimix 😎+😍` - Mélanger emojis

### 👥 Groupes
- `Ibkickall` - Exclure tous les membres
- `Ibtagadmin` - Mentionner admins
- `Ibacceptall` - Accepter toutes les demandes
- `Ibtagall` - Mentionner tous
- `Ibgetall` - Liste des membres
- `Ibgroup close` - Fermer groupe
- `Ibgroup open` - Ouvrir groupe
- `Ibadd [numéro]` - Ajouter membre
- `Ibvcf` - Exporter contacts VCF
- `Iblinkgc` - Lien d'invitation
- `Ibantilink on/off` - Anti-lien
- `Ibantisticker on/off` - Anti-sticker
- `Ibantigcm on/off` - Anti-GCM
- `Ibcreate [nom]` - Créer groupe
- `Ibgroupinfo` - Infos groupe

### 😎 Réactions
- `Ibyeet` - GIF Yeet
- `Ibslap` - GIF Slap
- `Ibnom` - GIF Nom
- `Ibpoke` - GIF Poke
- `Ibwave` - GIF Wave
- `Ibsmile` - GIF Smile
- `Ibdance` - GIF Dance
- `Ibsmug` - GIF Smug
- `Ibcringe` - GIF Cringe- `Ibhappy` - GIF Happy

---

## ⚙️ Configuration

Modifie ces variables dans `index.js`:

```javascript
const PREFIXE = 'Ib';
const NOM_BOT = 'IB_HEX_BOT';
const PROPRIETAIRE = 'IbSacko';
const DEVELOPPEUR = 'ibrahima sory sacko';
const NUMERO_OWNER = '224621963059';
```

---

## 🔧 APIs Utilisées

- LolHuman API (gratuit)
- API SimSimi
- Google Gemini API
- Telegra.ph Upload
- QR Server API

---

## 📱 Support

**Contact:** 
- WhatsApp: +224 621 963 059
- GitHub: [@ton-username](https://github.com/ton-username)

---

## ⚠️ Important

- Ce bot est à usage éducatif
- Respectez les conditions d'utilisation de WhatsApp
- L'auteur n'est pas responsable des abus
- Toutes les commandes sont publiques (pas de restriction)

---

## 📄 License

MIT License - IbSacko © 2026

---
<div align="center">
  <strong>Propulsé par IbSacko™</strong><br>
  ⭐ N'oublie pas de mettre une étoile! ⭐
</div>
