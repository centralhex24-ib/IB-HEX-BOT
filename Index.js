const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode, getContentType, downloadContentFromMessage, proto } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const express = require('express');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');

// Configuration
const PREFIXE = 'Ib';
const NOM_BOT = 'IB_HEX_BOT';
const PROPRIETAIRE = 'IbSacko';
const DEVELOPPEUR = 'ibrahima sory sacko';
const NUMERO_OWNER = '224621963059';
const IMAGE_URL = 'https://i.ibb.co/S4Bq8FGC/file-0000000019fc722f9717382cd6600e56.png';

// Variables globales
let tempsDemarrage = new Date();
let mode = 'public';
let antidelete = false;
let antilink = false;
let antisticker = false;
let antigcm = false;
let autoread = false;
let autosticker = false;
let anticall = false;

// Store pour les messages
const store = makeInMemoryStore({ logger: undefined });

// API Keys publiques
const API_KEYS = {
    api1: 'api-key-1',
    api2: 'api-key-2'
};

// Fonction pour formater le temps
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
}

// Fonction pour obtenir le temps de fonctionnement
function getUptime() {
    const now = new Date();
    const diff = Math.floor((now - tempsDemarrage) / 1000);
    return formatTime(diff);
}

// Fonction pour télécharger les médias
async function downloadMediaMessage(message, type) {
    const stream = await downloadContentFromMessage(message, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}

// Fonction pour envoyer le menu
async function sendMenu(sock, jid) {
    const menu = `╭──𝗜𝗕-𝗛𝗘𝗫-𝗕𝗢𝗧─────🥷
│ 𝗼𝘁 : ${NOM_BOT}
│ 𝗧𝗲𝗺𝗽𝘀 𝗗𝗲 𝗙𝗼𝗻𝗰𝘁𝗶𝗼𝗻𝗻𝗲𝗲𝗻𝘁 : ${getUptime()}
│ 𝗠𝗼𝗱𝗲 : ${mode}
│ 𝗣𝗿𝗲𝗳𝗶𝘅𝗲 : ${PREFIXE}
│ 𝗣𝗿𝗼𝗽𝗿𝗶𝗲́𝘁𝗮𝗶𝗿𝗲 : ${PROPRIETAIRE}
│ 𝗗́𝗲𝗼𝗽𝗽𝗲𝘂 : ${DEVELOPPEUR}
╰──────────────🥷
🤖────────────────🤖
       🥷𝗜𝗕𝗥𝗔𝗛𝗜𝗠𝗔 𝗦𝗢𝗡𝗬 𝗦𝗔𝗖𝗞𝗢🥷
────────────────🤖

🥷───────────────🥷
『 𝗠𝗘𝗡𝗨-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}menu → afficher le menu
│ ⬡ ${PREFIXE}alive → état du bot
│ ⬡ ${PREFIXE}dev → développeur
│ ⬡ ${PREFIXE}allvar → toutes les variables
│ ⬡ ${PREFIXE}ping → vitesse du bot
│ ⬡ ${PREFIXE}owner → propriétaire
╰────────────────🥷

🥷────────────────🥷
『 𝗢𝗪𝗡𝗘𝗥-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}join → rejoindre un groupe
│ ⬡ ${PREFIXE}leave → quitter un groupe
│ ⬡ ${PREFIXE}antidelete → anti-suppression
│ ⬡ ${PREFIXE}upload → téléverser
│ ⬡ ${PREFIXE}vv → vue unique
│ ⬡ ${PREFIXE}allcmds → toutes les commandes
│ ⬡ ${PREFIXE}delete → supprimer
│ ⬡ ${PREFIXE}🥷 → téléchargement privé
│ ⬡ ${PREFIXE}repo → dépôt GitHub
╰─────────────────🥷

🥷───────────────🥷
『 𝗜𝗔-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}ai → intelligence artificielle
│ ⬡ ${PREFIXE}bug → signaler un bug
│ ⬡ ${PREFIXE}bot → informations bot
│ ⬡ ${PREFIXE}gemini → IA Gemini
│ ⬡ ${PREFIXE}chatbot → discussion IA
│ ⬡ ${PREFIXE}gpt → ChatGPT
╰───────────────🥷

─────────────────🥷
『 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗦𝗦𝗘𝗨𝗥-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}attp → texte en sticker
│ ⬡ ${PREFIXE}toimage → convertir en image
│ ⬡ ${PREFIXE}gimage → image Google
│ ⬡ ${PREFIXE}mp3 → convertir en MP3
│ ⬡ ${PREFIXE}ss → capture d'écran
│ ⬡ ${PREFIXE}fancy → texte stylé
│ ⬡ ${PREFIXE}url → lien
│ ⬡ ${PREFIXE}sticker → créer sticker
│ ⬡ ${PREFIXE}take → récupérer média
╰─────────────────🥷

🥷───────────────🥷
『 𝗥𝗘𝗖𝗛𝗘𝗥𝗖𝗛𝗘-𝗛𝗘𝗫-𝗕𝗢𝗧』
│ ⬡ ${PREFIXE}google → recherche Google
│ ⬡ ${PREFIXE}play → Play Store
│ ⬡ ${PREFIXE}video → recherche vidéo
│ ⬡ ${PREFIXE}song → musique
│ ⬡ ${PREFIXE}mediafire → MediaFire
│ ⬡ ${PREFIXE}facebook → Facebook
│ ⬡ ${PREFIXE}instagram → Instagram
│ ⬡ ${PREFIXE}tiktok → TikTok
│ ⬡ ${PREFIXE}lyrics → paroles
│ ⬡ ${PREFIXE}image → images
╰────────────────

🥷─────────────────🥷
『 𝗗𝗩𝗘𝗥𝗧𝗜𝗦𝗘𝗠𝗘𝗡𝗧-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}getpp → photo de profil
│ ⬡ ${PREFIXE}goodnight → bonne nuit
│ ⬡ ${PREFIXE}wcg → classement
│ ⬡ ${PREFIXE}quizz → quiz
│ ⬡ ${PREFIXE}anime → anime
│ ⬡ ${PREFIXE}profile → profil
│ ⬡ ${PREFIXE}couple → couple
│ ⬡ ${PREFIXE}poll → sondage
│ ⬡ ${PREFIXE}emojimix → mélange d'emojis
╰─────────────────🥷

🥷────────────────🥷
『 𝗚𝗥𝗢𝗨𝗣𝗘𝗦-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}kickall → exclure tous
│ ⬡ ${PREFIXE}tagadmin → mention admins
│ ⬡ ${PREFIXE}acceptall → accepter tous
│ ⬡ ${PREFIXE}tagall → mentionner tous
│ ⬡ ${PREFIXE}getall → récupérer membres
│ ⬡ ${PREFIXE}group close → fermer groupe
│ ⬡ ${PREFIXE}group open → ouvrir groupe
│ ⬡ ${PREFIXE}add → ajouter membre
│ ⬡ ${PREFIXE}vcf → contacts VCF
│ ⬡ ${PREFIXE}linkgc → lien du groupe
│ ⬡ ${PREFIXE}antilink → anti-lien
│ ⬡ ${PREFIXE}antisticker → anti-sticker
│ ⬡ ${PREFIXE}antigcm → anti-mention
│ ⬡ ${PREFIXE}create → créer groupe
│ ⬡ ${PREFIXE}groupinfo → infos groupe
╰────────────────🥷

──────────────🥷
『 𝗥𝗘́𝗔𝗖𝗧𝗜𝗢𝗡𝗦-𝗛𝗘𝗫-𝗕𝗢𝗧 』
│ ⬡ ${PREFIXE}yeet → jeter
│ ⬡ ${PREFIXE}slap → gifler
│ ⬡ ${PREFIXE}nom → manger
│ ⬡ ${PREFIXE}poke → toucher
│ ⬡ ${PREFIXE}wave → saluer
│ ⬡ ${PREFIXE}smile → sourire
│ ⬡ ${PREFIXE}dance → danser
│ ⬡ ${PREFIXE}smug → sourire narquois
│ ⬡ ${PREFIXE}cringe → malaise
│ ⬡ ${PREFIXE}happy → heureux
╰──────────────🥷
🥷───────────────🥷
                   ⚡ 𝗜𝗕-𝗛𝗘𝗫-𝗕𝗢𝗧 ⚡

        propulsé par 𝗜𝗯 𝘀𝗮𝗸𝗼™
🥷───────────────🥷`;

    await sock.sendMessage(jid, { 
        image: { url: IMAGE_URL },
        caption: menu
    });
}

// Commandes principales
const commandes = {
    // MENU
    menu: async (sock, m, args) => {
        await sendMenu(sock, m.key.remoteJid);
    },
    
    alive: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            text: `🟢 *${NOM_BOT}* est en ligne!\n⏱️ Temps de fonctionnement: ${getUptime()}\n👤 Propriétaire: ${PROPRIETAIRE}`
        });
    },
    
    dev: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            text: `👨‍ *Développeur:* ${DEVELOPPEUR}\n📱 Contact: ${NUMERO_OWNER}\n🌟 Merci d'utiliser ${NOM_BOT}!`
        });
    },
    
    allvar: async (sock, m, args) => {
        const vars = `📊 *Variables du Bot:*\n\n` +
            `• Mode: ${mode}\n` +
            `• Préfixe: ${PREFIXE}\n` +
            `• Anti-delete: ${antidelete ? 'ON' : 'OFF'}\n` +
            `• Anti-link: ${antilink ? 'ON' : 'OFF'}\n` +
            `• Anti-sticker: ${antisticker ? 'ON' : 'OFF'}\n` +
            `• Anti-gcm: ${antigcm ? 'ON' : 'OFF'}\n` +
            `• Auto-read: ${autoread ? 'ON' : 'OFF'}\n` +
            `• Auto-sticker: ${autosticker ? 'ON' : 'OFF'}\n` +
            `• Anti-call: ${anticall ? 'ON' : 'OFF'}`;
        await sock.sendMessage(m.key.remoteJid, { text: vars });
    },
    
    ping: async (sock, m, args) => {
        const start = Date.now();
        await sock.sendMessage(m.key.remoteJid, { text: '📶 Test de vitesse...' });
        const end = Date.now();
        await sock.sendMessage(m.key.remoteJid, { text: `⚡ Vitesse: ${end - start}ms` });
    },
    
    owner: async (sock, m, args) => {
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            `FN:${PROPRIETAIRE}\n` +
            `TEL;type=CELL;type=VOICE;waid=${NUMERO_OWNER.replace('+','')}:+${NUMERO_OWNER}\n` +
            'END:VCARD';
        await sock.sendMessage(m.key.remoteJid, { 
            contacts: { displayName: PROPRIETAIRE, contacts: [{ vcard }] }
        });
    },

    // OWNER
    join: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Veuillez fournir un lien de groupe' });
        const code = args[0].split('chat.whatsapp.com/')[1];
        if (!code) return sock.sendMessage(m.key.remoteJid, { text: '❌ Lien invalide' });
        try {
            await sock.groupAcceptInvite(code);
            await sock.sendMessage(m.key.remoteJid, { text: '✅ Rejoint le groupe avec succès!' });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur: ' + e.message });
        }
    },
    
    leave: async (sock, m, args) => {
        await sock.groupLeave(m.key.remoteJid);
        await sock.sendMessage(m.key.remoteJid, { text: '👋 Au revoir!' });
    },
    
    antidelete: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Utilisez: Ibantidelete on/off' });
        antidelete = args[0].toLowerCase() === 'on';
        await sock.sendMessage(m.key.remoteJid, { text: `Anti-delete ${antidelete ? 'activé' : 'désactivé'}` });
    },
    
    upload: async (sock, m, args) => {
        if (!m.message) return;
        const type = Object.keys(m.message)[0];
        const buffer = await downloadMediaMessage(m.message[type], type.replace('Message', ''));
        await sock.sendMessage(m.key.remoteJid, { document: buffer, fileName: `file_${Date.now()}` });
    },
    
    vv: async (sock, m, args) => {
        if (!m.message.viewOnceMessage) return sock.sendMessage(m.key.remoteJid, { text: '❌ Ce n'est pas un message à vue unique' });
        const type = Object.keys(m.message.viewOnceMessage.message)[0];
        const buffer = await downloadMediaMessage(m.message.viewOnceMessage.message[type], type.replace('Message', ''));
        await sock.sendMessage(m.key.remoteJid, { [type === 'imageMessage' ? 'image' : 'video']: buffer });
    },
    
    '🥷': async (sock, m, args) => {
        if (!m.message.viewOnceMessage) return sock.sendMessage(m.key.remoteJid, { text: '❌ Ce n'est pas un message à vue unique' });
        const type = Object.keys(m.message.viewOnceMessage.message)[0];
        const buffer = await downloadMediaMessage(m.message.viewOnceMessage.message[type], type.replace('Message', ''));
        await sock.sendMessage(NUMERO_OWNER + '@s.whatsapp.net', { [type === 'imageMessage' ? 'image' : 'video']: buffer });
        await sock.sendMessage(m.key.remoteJid, { text: '✅ Média envoyé au propriétaire!' });
    },
    
    allcmds: async (sock, m, args) => {
        const cmds = Object.keys(commandes).join('\n• ');
        await sock.sendMessage(m.key.remoteJid, { text: `📜 *Toutes les commandes:*\n\n• ${cmds}` });
    },
    
    delete: async (sock, m, args) => {
        if (!m.quoted) return sock.sendMessage(m.key.remoteJid, { text: '❌ Répondez à un message' });
        await sock.sendMessage(m.key.remoteJid, { delete: m.quoted.v });
    },
    
    repo: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            text: '📦 *Dépôt GitHub:*\nhttps://github.com/ton-username/IB-HEX-BOT\n\n⭐ N'oublie pas de mettre une étoile!'
        });
    },

    // IA
    ai: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Pose une question: Ibai [question]' });
        try {
            const response = await axios.get(`https://api.eggsy.dev/api/ai?text=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { text: `🤖 ${response.data.result}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur IA' });
        }
    },
    
    bug: async (sock, m, args) => {
        await sock.sendMessage(NUMERO_OWNER + '@s.whatsapp.net', { 
            text: `🐛 *Bug Report:*\nDe: ${m.pushName}\nMessage: ${args.join(' ')}`
        });
        await sock.sendMessage(m.key.remoteJid, { text: '✅ Bug signalé au développeur!' });
    },
    
    bot: async (sock, m, args) => {
        const info = `🤖 *${NOM_BOT}*\n\n` +
            `• Version: 1.0.0\n` +
            `• Bibliothèque: Baileys\n` +
            `• Développeur: ${DEVELOPPEUR}\n` +
            `• Préfixe: ${PREFIXE}\n` +
            `• Commandes: ${Object.keys(commandes).length}\n` +
            `• Uptime: ${getUptime()}`;
        await sock.sendMessage(m.key.remoteJid, { text: info });
    },
    
    gemini: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibgemini [question]' });
        try {
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDwpT0OoGbVlBbPzF7k8bF0cC9dD0eE1fF', {
                contents: [{ parts: [{ text: args.join(' ') }] }]
            });
            await sock.sendMessage(m.key.remoteJid, { text: response.data.candidates[0].content.parts[0].text });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur Gemini' });
        }
    },
    
    chatbot: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Parle-moi: Ibchatbot [message]' });
        try {
            const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(args.join(' '))}&lc=fr`);
            await sock.sendMessage(m.key.remoteJid, { text: `🗣️ ${response.data.message}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur chatbot' });
        }
    },
    
    gpt: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibgpt [question]' });
        try {
            const response = await axios.get(`https://api.eggsy.dev/api/gpt?text=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { text: `🧠 ${response.data.result}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur GPT' });
        }
    },

    // CONVERTISSEUR
    attp: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibattp [texte]' });
        const text = args.join(' ');
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: `https://api.lolhuman.xyz/api/attp?apikey=freekey&text=${encodeURIComponent(text)}` }
        });
    },
    
    toimage: async (sock, m, args) => {
        if (!m.quoted || m.quoted.mtype !== 'stickerMessage') return sock.sendMessage(m.key.remoteJid, { text: '❌ Réponds à un sticker' });
        const buffer = await downloadMediaMessage(m.quoted, 'sticker');
        await sock.sendMessage(m.key.remoteJid, { image: buffer });
    },
    
    gimage: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibgimage [recherche]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/gimage?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { image: { url: response.data.result[0] } });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Aucune image trouvée' });
        }
    },
    
    mp3: async (sock, m, args) => {
        if (!m.quoted || m.quoted.mtype !== 'videoMessage') return sock.sendMessage(m.key.remoteJid, { text: '❌ Réponds à une vidéo' });
        const buffer = await downloadMediaMessage(m.quoted, 'video');
        await sock.sendMessage(m.key.remoteJid, { audio: buffer, mimetype: 'audio/mp4' });
    },
    
    ss: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibss [url]' });
        const url = args[0];
        await sock.sendMessage(m.key.remoteJid, { 
            image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=freekey&url=${encodeURIComponent(url)}` }
        });
    },
    
    fancy: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibfancy [texte]' });
        const text = args.join(' ');
        const styles = ['𝕋𝕖𝕩𝕥𝕖', '𝔗𝔵𝔱𝔢', '𝕿𝖊𝖙', '𝓮𝓽𝓮', '𝑇𝑒𝑥𝑡𝑒', '𝑻𝒙𝒕𝒆'];
        const random = styles[Math.floor(Math.random() * styles.length)];
        await sock.sendMessage(m.key.remoteJid, { text: random });
    },
    
    url: async (sock, m, args) => {
        if (!m.quoted) return sock.sendMessage(m.key.remoteJid, { text: '❌ Réponds à une image/vidéo' });
        const type = m.quoted.mtype.replace('Message', '');
        const buffer = await downloadMediaMessage(m.quoted, type);
        const form = new FormData();
        form.append('file', buffer, { filename: 'file' });
        const response = await axios.post('https://telegra.ph/upload', form, { headers: form.getHeaders() });
        await sock.sendMessage(m.key.remoteJid, { text: `🔗 https://telegra.ph${response.data[0].src}` });
    },
    
    sticker: async (sock, m, args) => {
        if (!m.quoted) return sock.sendMessage(m.key.remoteJid, { text: '❌ Réponds à une image/vidéo' });
        const type = m.quoted.mtype.replace('Message', '');
        const buffer = await downloadMediaMessage(m.quoted, type);
        await sock.sendMessage(m.key.remoteJid, { sticker: buffer });
    },
    
    take: async (sock, m, args) => {
        if (!m.quoted || m.quoted.mtype !== 'stickerMessage') return sock.sendMessage(m.key.remoteJid, { text: '❌ Réponds à un sticker' });
        const buffer = await downloadMediaMessage(m.quoted, 'sticker');
        await sock.sendMessage(m.key.remoteJid, { sticker: buffer });
    },

    // RECHERCHE
    google: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibgoogle [recherche]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/google?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            let result = `🔍 *Résultats pour:* ${args.join(' ')}\n\n`;
            response.data.result.slice(0, 5).forEach((item, i) => {
                result += `${i+1}. ${item.title}\n${item.link}\n\n`;
            });
            await sock.sendMessage(m.key.remoteJid, { text: result });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur recherche' });
        }
    },
    
    play: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibplay [nom chanson]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/ytplay?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { 
                audio: { url: response.data.result.audio }, 
                mimetype: 'audio/mp4',
                fileName: response.data.result.title + '.mp3'
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur Play' });
        }
    },
    
    video: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibvideo [nom vidéo]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/ytplay2?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { 
                video: { url: response.data.result.video }, 
                caption: response.data.result.title
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur vidéo' });
        }
    },
    
    song: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibsong [nom chanson]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/ytplay?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { 
                document: { url: response.data.result.audio }, 
                fileName: response.data.result.title + '.mp3',
                mimetype: 'audio/mp3'
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur song' });
        }
    },
    
    mediafire: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibmediafire [lien]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/mediafire?apikey=freekey&url=${encodeURIComponent(args[0])}`);
            await sock.sendMessage(m.key.remoteJid, { 
                document: { url: response.data.result.link }, 
                fileName: response.data.result.filename
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur MediaFire' });
        }
    },
    
    facebook: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibfacebook [lien]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=freekey&url=${encodeURIComponent(args[0])}`);
            await sock.sendMessage(m.key.remoteJid, { 
                video: { url: response.data.result[0] }
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur Facebook' });
        }
    },
    
    instagram: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibinstagram [lien]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=freekey&url=${encodeURIComponent(args[0])}`);
            for (const url of response.data.result) {
                await sock.sendMessage(m.key.remoteJid, { image: { url } });
            }
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur Instagram' });
        }
    },
    
    tiktok: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibtiktok [lien]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=freekey&url=${encodeURIComponent(args[0])}`);
            await sock.sendMessage(m.key.remoteJid, { 
                video: { url: response.data.result.nowm }
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur TikTok' });
        }
    },
    
    lyrics: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Iiblyrics [chanson]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            await sock.sendMessage(m.key.remoteJid, { text: `🎵 *${args.join(' ')}*\n\n${response.data.result}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Paroles non trouvées' });
        }
    },
    
    image: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibimage [recherche]' });
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=freekey&query=${encodeURIComponent(args.join(' '))}`);
            const random = response.data.result[Math.floor(Math.random() * response.data.result.length)];
            await sock.sendMessage(m.key.remoteJid, { image: { url: random } });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur image' });
        }
    },

    // DIVERTISSEMENT
    getpp: async (sock, m, args) => {
        const user = m.mentionedJid[0] || m.key.remoteJid;
        try {
            const pp = await sock.profilePictureUrl(user, 'image');
            await sock.sendMessage(m.key.remoteJid, { image: { url: pp } });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Pas de photo de profil' });
        }
    },
    
    goodnight: async (sock, m, args) => {
        const messages = ['Bonne nuit! 🌙', 'Fais de beaux rêves! 💤', 'Dors bien! 😴'];
        await sock.sendMessage(m.key.remoteJid, { text: messages[Math.floor(Math.random() * messages.length)] });
    },
    
    wcg: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Commande groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = groupMetadata.participants;
        const admins = participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`).join('\n');
        await sock.sendMessage(m.key.remoteJid, { 
            text: `👑 *Admins du groupe:*\n\n${admins}`,
            mentions: participants.map(p => p.id)
        });
    },
    
    quizz: async (sock, m, args) => {
        const questions = [
            { q: 'Quelle est la capitale de la France?', r: 'Paris' },
            { q: 'Combien font 2+2?', r: '4' },
            { q: 'Quelle est la plus grande planète?', r: 'Jupiter' }
        ];
        const random = questions[Math.floor(Math.random() * questions.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `❓ *Quiz:*\n${random.q}\n\nRéponse: ||${random.r}||` });
    },
    
    anime: async (sock, m, args) => {
        try {
            const response = await axios.get('https://api.lolhuman.xyz/api/randomanime?apikey=freekey');
            await sock.sendMessage(m.key.remoteJid, { image: { url: response.data.result } });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur anime' });
        }
    },
    
    profile: async (sock, m, args) => {
        const user = m.mentionedJid[0] || m.key.remoteJid;
        let pp = 'https://i.ibb.co/S4Bq8FGC/file-0000000019fc722f9717382cd6600e56.png';
        try {
            pp = await sock.profilePictureUrl(user, 'image');
        } catch (e) {}
        await sock.sendMessage(m.key.remoteJid, { 
            image: { url: pp },
            caption: `👤 *Profil:*\nNom: ${m.pushName}\nNuméro: ${user.split('@')[0]}`
        });
    },
    
    couple: async (sock, m, args) => {
        try {
            const response = await axios.get('https://api.lolhuman.xyz/api/couple?apikey=freekey');
            await sock.sendMessage(m.key.remoteJid, { 
                image: { url: response.data.result.male },
                caption: '👦 Male'
            });
            await sock.sendMessage(m.key.remoteJid, { 
                image: { url: response.data.result.female },
                caption: '👧 Female'
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur couple' });
        }
    },
    
    poll: async (sock, m, args) => {
        if (args.length < 2) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibpoll question|option1|option2' });
        const text = args.join(' ');
        const [question, ...options] = text.split('|');
        await sock.sendMessage(m.key.remoteJid, { 
            poll: { name: question, values: options }
        });
    },
    
    emojimix: async (sock, m, args) => {
        if (args.length < 2) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibemojimix 😎+😍' });
        const emojis = args.join('').split('+');
        try {
            const response = await axios.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emojis[0])}_${encodeURIComponent(emojis[1])}`);
            await sock.sendMessage(m.key.remoteJid, { sticker: { url: response.data.results[0].url } });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur emoji mix' });
        }
    },

    // GROUPES
    kickall: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = groupMetadata.participants.filter(p => !p.admin);
        for (const participant of participants) {
            await sock.groupParticipantsUpdate(m.key.remoteJid, [participant.id], 'remove');
        }
        await sock.sendMessage(m.key.remoteJid, { text: '✅ Tous les membres non-admins ont été retirés' });
    },
    
    tagadmin: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const admins = groupMetadata.participants.filter(p => p.admin);
        let text = '📢 *Message aux admins:*\n\n';
        if (args[0]) text += args.join(' ') + '\n\n';
        for (const admin of admins) {
            text += `@${admin.id.split('@')[0]}\n`;
        }
        await sock.sendMessage(m.key.remoteJid, { text, mentions: admins.map(a => a.id) });
    },
    
    acceptall: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const pendingRequests = await sock.groupRequestParticipantsList(m.key.remoteJid);
        for (const request of pendingRequests) {
            await sock.groupRequestParticipantsUpdate(m.key.remoteJid, [request.jid], 'approve');
        }
        await sock.sendMessage(m.key.remoteJid, { text: '✅ Toutes les demandes ont été acceptées' });
    },
    
    tagall: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = groupMetadata.participants;
        let text = '📢 *Message à tous:*\n\n';
        if (args[0]) text += args.join(' ') + '\n\n';
        for (const participant of participants) {
            text += `@${participant.id.split('@')[0]}\n`;
        }
        await sock.sendMessage(m.key.remoteJid, { text, mentions: participants.map(p => p.id) });
    },
    
    getall: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = groupMetadata.participants;
        let text = `👥 *Membres du groupe (${participants.length}):*\n\n`;
        participants.forEach((p, i) => {
            text += `${i+1}. @${p.id.split('@')[0]} ${p.admin ? '👑' : ''}\n`;
        });
        await sock.sendMessage(m.key.remoteJid, { text, mentions: participants.map(p => p.id) });
    },
    
    'group close': async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
        await sock.sendMessage(m.key.remoteJid, { text: '🔒 Groupe fermé (admins seulement)' });
    },
    
    'group open': async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
        await sock.sendMessage(m.key.remoteJid, { text: '🔓 Groupe ouvert (tous peuvent écrire)' });
    },
    
    add: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibadd [numéro]' });
        const number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        try {
            await sock.groupParticipantsUpdate(m.key.remoteJid, [number], 'add');
            await sock.sendMessage(m.key.remoteJid, { text: '✅ Membre ajouté' });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Erreur: ' + e.message });
        }
    },
    
    vcf: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        let vcf = 'BEGIN:VCARD\nVERSION:3.0\n';
        groupMetadata.participants.forEach((p, i) => {
            vcf += `FN:Contact ${i+1}\nTEL;type=CELL;waid=${p.id.split('@')[0]}:+${p.id.split('@')[0]}\nEND:VCARD\n`;
        });
        fs.writeFileSync('contacts.vcf', vcf);
        await sock.sendMessage(m.key.remoteJid, { 
            document: fs.readFileSync('contacts.vcf'), 
            fileName: 'contacts.vcf',
            mimetype: 'text/vcard'
        });
        fs.unlinkSync('contacts.vcf');
    },
    
    linkgc: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const code = await sock.groupInviteCode(m.key.remoteJid);
        await sock.sendMessage(m.key.remoteJid, { text: `🔗 https://chat.whatsapp.com/${code}` });
    },
    
    antilink: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Utilisez: Ibililink on/off' });
        antilink = args[0].toLowerCase() === 'on';
        await sock.sendMessage(m.key.remoteJid, { text: `Anti-link ${antilink ? 'activé' : 'désactivé'}` });
    },
    
    antisticker: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Utilisez: Ibibantisticker on/off' });
        antisticker = args[0].toLowerCase() === 'on';
        await sock.sendMessage(m.key.remoteJid, { text: `Anti-sticker ${antisticker ? 'activé' : 'désactivé'}` });
    },
    
    antigcm: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Utilisez: Ibibantigcm on/off' });
        antigcm = args[0].toLowerCase() === 'on';
        await sock.sendMessage(m.key.remoteJid, { text: `Anti-GCM ${antigcm ? 'activé' : 'désactivé'}` });
    },
    
    create: async (sock, m, args) => {
        if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: '❌ Utilise: Ibcreate [nom]' });
        const name = args.join(' ');
        await sock.groupCreate(name, [m.key.remoteJid]);
        await sock.sendMessage(m.key.remoteJid, { text: '✅ Groupe créé!' });
    },
    
    groupinfo: async (sock, m, args) => {
        if (!m.isGroup) return sock.sendMessage(m.key.remoteJid, { text: '❌ Groupe uniquement' });
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const pp = await sock.profilePictureUrl(m.key.remoteJid, 'image').catch(() => null);
        const text = `📊 *Infos Groupe:*\n\n` +
            `• Nom: ${groupMetadata.subject}\n` +
            `• Membres: ${groupMetadata.participants.length}\n` +
            `• Créé: ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}\n` +
            `• Description: ${groupMetadata.desc || 'Aucune'}`;
        await sock.sendMessage(m.key.remoteJid, { 
            image: pp ? { url: pp } : null,
            caption: text
        });
    },

    // RÉACTIONS
    yeet: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/yeet-gif-12136964' }
        });
    },
    
    slap: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/slap-gif-14149963' }
        });
    },
    
    nom: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/nom-nom-nom-gif-15049963' }
        });
    },
    
    poke: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/poke-gif-15049964' }
        });
    },
    
    wave: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/wave-hello-gif-15049965' }
        });
    },
    
    smile: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/smile-happy-gif-15049966' }
        });
    },
    
    dance: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/dance-gif-15049967' }
        });
    },
    
    smug: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/smug-gif-15049968' }
        });
    },
    
    cringe: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/cringe-gif-15049969' }
        });
    },
    
    happy: async (sock, m, args) => {
        await sock.sendMessage(m.key.remoteJid, { 
            sticker: { url: 'https://tenor.com/view/happy-gif-15049970' }
        });
    }
};

// Serveur web pour QR Code
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'qrcode.html'));
});

app.get('/qr', async (req, res) => {
    if (global.qrCode) {
        res.json({ qr: global.qrCode });
    } else {
        res.json({ qr: null });
    }
});

// Démarrage du bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ['IB-HEX-BOT', 'Chrome', '1.0.0']
    });

    store.bind(sock.ev);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            global.qrCode = qr;
            console.log('QR Code:', qr);
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Déconnecté, reconnexion:', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Connecté!');
            global.qrCode = null;
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        const messageType = getContentType(msg.message);
        const text = msg.message.conversation || 
                     msg.message.extendedTextMessage?.text || 
                     msg.message.imageMessage?.caption || 
                     msg.message.videoMessage?.caption || '';
        
        if (!text.startsWith(PREFIXE)) return;
        
        const args = text.slice(PREFIXE.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();
        
        if (commandes[cmd]) {
            try {
                await commandes[cmd](sock, msg, args);
            } catch (e) {
                console.error(e);
                await sock.sendMessage(msg.key.remoteJid, { text: '❌ Erreur: ' + e.message });
            }
        }
        
        // Anti-link
        if (antilink && msg.key.remoteJid.endsWith('@g.us') && text.match(/chat.whatsapp.com/)) {
            await sock.groupParticipantsUpdate(msg.key.remoteJid, [msg.key.participant], 'remove');
        }
        
        // Anti-delete
        if (antidelete && msg.message.protocolMessage) {
            // Logique anti-delete
        }
    });
}

// Démarrer le serveur web et le bot
app.listen(PORT, () => {
    console.log(`🌐 Serveur web démarré sur le port ${PORT}`);
    startBot();
});
