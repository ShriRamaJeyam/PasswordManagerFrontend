const emojiList = ["😀","😱","🤯","😁","😅","😂","🤣","😭","😘","🥰","😍","🤩","🥳","😊","😑","🤪","🤬","😡","😬","🤐","🌛","🌚","🌝","🌞","🤢","🤮","🥶","😈","🤑","😎","🤥","🤡","👻","💩","👺","☠️","😻","😹","🎃","❤️","🧡","💛","💖","💙","💜","🤎","🖤","🤍","🦷","🦴","👃🏻","👃🏿","🌹","🥀","🌷","🏵️","🌿","🌱","🌺","🌾","🍂","🍁","🌄","🌨️","🌩️","🌧️","⛈️","💧","☔","🌈","🌘","🪐","🙈","🙉","🙊","🦁","🐯","🐺","🐻","🐨","🐷","🐮","🦜","🐦","🐌","🍓","🍒","🍎","🍉","🍑","🍇","🥝","🍏","🍋","🍄","🌽","🥦","🥒","🥬","🥑","🥜","🍞","🧄","🍆","🛕","🕍","🗽","🏔️","⛰️","🥇","🥈","🥉","⚾","🥎","🏀","⚽","🏐","🏈","🏉","🎾","🏆","💍","🧪","🌡️","🛠️","🔨","⛏️","📐","📏","🖇️","🗑️","🔒","🔓","🗝️","🔑","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","⛎","⚛️","🛐","🕉️","☸️","☮️","☯️","☪️","✝️","☦️","✡️","🔯","🕎","♾"];

const numberKey = [[13,115,42,45,4,109,3,88,116,60,146,153,8,102,36,21,131,55,99,70,107,51,124,72,104,92,2,22,12,159,154,56,91,19,16,149,50,127,54,123,87,114,148,1,117,75,126,143,128,29,81,31,26,111,155,100,6,23,136,30,82,119,145,108,43],[104,58,134,36,66,59,32,128,35,118,39,114,94,43,132,123,71,63,107,99,0,97,98,82,131,142,151,126,113,24,143,14,64,136,91,23,139,152,92,50,88,6,80,87,89,69,125,67,53,25,81,153,9,48,133,117,141,38,159,76,85,146,78,60,105],[95,92,11,14,160,65,126,21,4,19,109,3,96,132,138,139,31,157,124,118,141,46,134,112,69,142,101,80,50,111,93,42,32,108,137,117,119,16,152,57,91,159,122,151,154,54,2,104,30,35,128,78,146,23,82,7,45,71,135,83,90,148,60,55,0],[146,51,133,10,121,129,125,68,138,11,43,64,82,59,61,84,21,0,39,104,136,95,54,34,158,6,141,96,113,31,35,139,108,33,107,157,66,100,18,42,22,145,26,98,5,122,25,77,123,62,83,30,116,71,148,115,154,53,153,110,56,142,112,90,36],[114,26,101,56,100,9,109,19,55,10,83,69,51,143,33,16,131,94,41,81,117,35,65,11,91,74,31,110,108,28,57,61,2,36,82,44,86,136,20,93,142,134,146,132,62,45,106,103,4,32,149,156,145,27,138,38,140,49,59,76,154,67,77,3,107],[84,65,43,52,31,98,146,95,136,88,3,32,127,109,8,145,155,140,89,41,37,71,116,111,117,86,137,150,85,64,58,75,123,134,15,87,102,149,73,42,103,97,158,61,110,53,153,77,157,126,129,35,114,130,100,26,67,0,39,19,121,113,76,104,124],[78,8,20,91,109,1,123,14,56,86,93,141,48,71,87,94,18,90,15,46,27,44,92,41,155,82,132,151,121,76,23,3,53,149,80,131,119,88,2,57,24,65,146,49,37,89,66,106,126,11,112,38,96,34,60,64,26,77,156,127,136,129,128,68,40],[50,49,126,98,44,0,76,148,121,111,61,17,153,133,52,90,24,67,77,46,123,63,75,27,28,144,47,53,30,6,134,73,65,154,59,106,40,45,83,113,147,119,60,51,150,58,115,88,152,1,129,11,132,117,100,64,41,78,107,136,54,103,97,22,79],[62,15,85,155,139,50,20,88,39,99,55,138,157,79,10,5,42,46,69,43,11,124,60,30,102,112,29,61,133,22,135,51,147,158,28,7,121,129,12,100,107,21,82,149,150,126,63,95,45,73,13,26,68,52,104,136,76,153,72,2,110,41,118,93,38],[115,3,80,89,29,57,33,90,157,79,15,117,139,159,69,113,13,43,27,60,44,77,78,63,92,127,4,17,62,66,108,48,64,1,5,32,49,149,74,146,93,84,143,132,158,142,38,123,138,155,25,122,105,97,71,144,114,67,129,0,82,124,56,101,135],[37,121,67,98,58,102,0,122,91,39,59,120,21,152,54,94,52,71,12,45,3,160,19,93,56,66,129,150,63,137,51,72,142,114,159,2,16,62,33,138,95,73,157,25,24,136,22,50,112,61,74,110,47,96,14,48,68,38,10,35,7,15,127,149,145],[71,15,7,37,28,157,55,123,45,48,93,54,53,106,4,66,105,29,3,51,101,0,109,144,40,5,78,26,80,62,147,125,92,96,126,139,97,65,87,47,35,112,130,75,89,158,2,110,151,154,21,49,145,19,12,16,115,141,137,108,160,143,58,99,27],[139,149,65,21,75,45,67,33,147,49,52,56,121,128,80,60,58,41,102,24,99,156,106,88,119,131,125,79,8,27,0,55,122,2,130,77,46,59,111,66,96,6,137,51,54,154,57,16,101,68,150,14,44,134,100,35,159,15,135,103,76,23,98,43,151],[46,62,117,5,69,7,50,45,25,84,89,120,92,27,94,35,134,15,76,66,56,59,65,49,146,60,128,126,0,119,63,118,106,129,100,75,95,140,44,142,14,74,113,51,103,112,154,19,16,110,148,64,36,41,78,57,107,12,87,155,101,131,18,124,54],[65,40,111,46,128,15,160,49,84,19,88,12,54,27,134,85,61,26,75,47,151,77,71,144,2,38,140,105,24,119,129,5,69,96,114,78,82,98,39,36,141,137,72,136,25,32,153,11,1,143,35,150,33,103,90,157,42,44,6,53,107,51,133,59,91],[61,132,29,19,84,95,59,130,138,121,64,107,36,108,88,57,135,157,153,122,4,119,149,58,66,5,75,104,72,137,33,34,54,92,53,51,134,73,103,35,8,76,105,62,126,91,89,139,111,141,38,0,93,151,40,63,2,47,11,20,106,80,60,118,115],[18,114,22,151,82,63,23,40,147,111,152,137,66,32,139,119,2,133,130,138,108,140,77,158,75,25,57,38,29,131,113,42,69,46,87,78,3,143,95,27,19,34,127,109,134,49,101,16,4,48,123,11,122,35,154,54,26,126,144,47,36,5,98,83,105],[142,47,56,9,34,94,28,153,108,114,112,151,35,37,120,82,18,133,160,119,53,87,36,69,71,149,154,105,63,146,38,152,110,141,150,96,121,128,49,5,16,92,52,147,113,55,7,134,109,70,23,21,124,24,22,66,14,40,20,95,123,139,143,62,107],[11,1,113,149,33,67,66,155,145,39,59,100,45,159,115,41,99,116,120,36,6,74,138,61,123,127,22,126,42,110,143,18,58,157,10,78,111,101,134,79,28,50,16,25,147,103,151,3,55,75,70,131,92,140,27,62,9,60,46,96,160,107,20,91,139],[123,151,101,40,51,36,52,112,160,68,111,41,124,155,34,138,147,121,118,96,38,90,91,25,113,103,149,152,156,55,19,122,17,117,15,98,120,48,49,29,110,82,107,105,81,102,136,73,157,50,125,88,128,24,42,144,134,137,45,14,39,76,13,109,46],[149,53,11,54,20,12,63,79,147,21,86,85,4,83,141,140,93,31,33,108,70,76,139,7,92,15,37,13,146,0,35,128,50,44,121,102,61,66,120,113,104,60,103,14,8,136,64,119,94,81,152,145,129,36,142,26,17,117,131,58,71,62,123,82,130],[44,117,121,49,135,112,109,139,100,47,86,107,137,122,28,22,60,103,148,62,42,74,46,25,45,154,4,71,57,36,21,160,131,67,141,19,138,43,18,144,85,61,118,149,96,83,48,92,156,114,70,39,31,106,116,11,51,64,66,157,150,145,0,52,55],[106,23,20,108,156,21,118,35,143,139,98,73,37,138,112,68,88,123,60,1,148,96,61,109,145,14,150,34,89,133,44,94,40,3,144,81,39,11,110,113,30,157,62,36,25,101,26,56,24,53,152,87,84,32,57,15,6,78,69,127,48,95,54,50,129],[3,89,61,78,71,94,100,1,104,98,47,105,24,119,51,35,62,46,18,30,120,21,79,133,40,92,76,65,96,110,13,111,157,115,6,84,128,15,60,2,125,147,131,152,4,72,38,140,121,123,33,43,159,74,70,102,25,138,7,16,112,130,109,81,85],[150,137,73,138,1,115,146,85,133,106,82,102,126,46,59,155,41,129,121,131,61,76,125,11,25,70,62,3,124,72,12,54,52,119,18,99,7,109,37,143,91,45,96,57,108,153,50,103,75,122,33,147,43,2,30,42,51,111,65,83,156,22,154,86,44],[13,64,70,55,40,10,84,34,120,94,16,134,124,116,43,99,105,76,0,137,24,41,88,112,115,63,114,135,14,19,29,32,130,57,131,21,61,147,31,15,1,110,157,154,30,89,91,113,52,4,54,100,37,9,111,20,125,62,80,2,156,149,50,36,93],[124,59,5,21,29,81,106,52,86,82,63,132,142,115,33,54,0,137,118,1,31,43,35,110,14,79,80,4,117,58,108,18,37,107,72,42,116,73,26,138,85,66,15,71,102,57,95,104,76,49,112,16,13,126,125,2,3,36,62,140,159,139,160,135,68],[11,72,129,86,4,28,78,121,110,64,0,101,93,12,83,81,94,95,146,1,156,142,135,44,27,117,18,109,150,31,127,106,26,21,75,99,88,148,159,55,67,80,48,108,84,122,113,29,152,131,51,144,130,105,120,36,41,59,125,58,49,13,30,6,17],[9,90,108,19,113,69,88,144,92,39,31,71,160,137,112,5,97,151,51,149,150,26,131,2,104,74,43,89,128,72,153,61,0,60,141,156,46,13,102,48,44,66,21,91,11,95,157,136,132,127,37,47,10,4,105,34,123,59,80,83,67,55,85,135,125],[13,94,43,148,51,15,70,122,24,65,120,2,142,95,27,57,99,8,124,105,97,66,149,134,106,58,138,68,75,53,135,158,29,78,156,62,41,111,150,3,87,151,159,83,145,90,139,46,73,72,104,52,141,116,127,115,5,64,61,140,84,109,14,143,82],[18,100,142,71,85,49,146,156,4,14,13,5,15,35,123,26,136,54,97,103,118,119,78,21,33,30,52,91,43,61,115,120,96,74,65,82,3,104,134,117,23,87,37,83,157,101,89,130,99,121,34,84,94,50,140,67,16,92,40,127,51,31,6,88,129],[25,158,100,86,6,120,45,63,69,160,58,112,113,88,26,84,15,11,117,72,85,47,116,16,14,143,135,20,29,66,23,92,68,5,35,17,55,3,41,59,37,28,126,87,150,60,94,79,149,77,121,134,136,115,67,12,81,70,140,27,132,21,127,51,76],[125,117,89,30,96,46,78,108,139,154,32,41,81,64,77,59,12,124,113,55,49,48,76,66,42,87,110,44,132,56,120,107,37,5,88,18,54,103,86,79,38,4,72,52,112,11,35,69,20,144,128,50,106,151,40,114,21,160,63,136,121,67,60,155,62],[104,138,103,13,15,17,116,114,78,128,65,130,52,82,3,46,69,24,127,11,151,60,18,144,43,55,16,135,139,156,137,93,77,21,80,88,108,53,121,59,117,92,126,148,129,28,64,30,2,153,140,150,124,89,111,105,29,45,87,7,141,160,41,132,50],[100,78,118,104,21,143,117,40,0,139,145,58,2,95,86,72,112,81,60,160,75,70,126,63,48,102,16,93,140,122,151,79,68,90,135,12,137,73,22,51,18,157,82,105,96,53,35,99,133,129,107,136,25,156,69,113,147,74,125,89,27,41,65,71,4],[35,72,99,12,125,1,54,34,145,90,8,102,92,103,68,120,100,154,117,47,127,21,95,64,151,37,74,19,29,42,78,22,128,108,52,7,97,155,76,33,36,86,4,56,131,51,77,89,63,11,124,123,61,0,112,109,48,10,30,143,105,137,146,82,16],[6,135,4,146,108,93,26,69,46,40,25,125,17,103,122,94,76,31,86,36,22,37,0,140,61,149,158,59,130,91,110,54,139,82,48,101,116,154,85,112,98,16,104,144,30,142,3,11,8,20,95,152,35,156,90,81,127,32,24,45,114,111,12,64,58],[65,33,112,81,8,124,46,152,75,22,103,159,31,106,10,16,98,51,23,49,80,67,7,71,82,93,45,27,125,1,9,77,146,115,129,32,149,64,90,138,4,154,95,73,89,29,153,91,113,70,150,72,21,134,142,3,86,30,88,60,94,19,15,44,114],[156,122,113,64,71,118,87,10,94,3,89,138,35,145,152,24,38,54,44,157,149,133,2,30,19,158,43,32,13,9,108,36,119,15,81,12,29,52,131,116,101,75,5,160,132,27,85,53,39,0,154,125,1,92,106,117,50,62,151,45,90,104,83,60,59],[123,151,3,66,32,4,102,128,147,130,140,154,112,56,117,82,19,111,97,159,51,1,88,131,84,126,153,23,141,132,85,134,21,136,95,101,89,41,48,0,22,93,71,106,47,94,121,73,7,11,107,13,24,114,67,157,63,39,36,79,20,76,52,90,150],[96,134,35,14,12,151,45,9,128,58,76,42,15,51,113,144,102,143,97,81,147,152,67,57,43,28,37,40,82,65,138,106,17,137,94,71,8,10,123,104,80,3,41,95,5,38,117,60,110,118,88,33,48,125,30,101,50,69,108,131,86,0,111,120,18],[106,142,15,93,68,79,131,127,7,70,77,104,1,140,24,143,48,102,89,39,108,151,112,23,29,97,160,95,129,43,107,78,144,44,50,147,103,118,152,148,145,49,119,42,90,54,32,64,135,18,19,3,28,41,52,115,109,94,126,0,2,47,62,149,51],[57,137,17,82,53,77,134,78,114,129,81,54,113,136,159,52,138,93,95,51,35,22,60,13,142,37,158,48,75,148,132,25,41,111,74,55,100,33,66,84,68,97,90,87,73,49,72,110,64,96,21,123,47,34,117,107,14,126,150,62,151,63,76,102,27],[70,92,25,54,117,147,113,93,63,36,57,156,77,100,85,146,6,140,8,102,27,26,28,107,157,80,96,138,121,105,76,132,123,101,29,69,2,51,52,87,67,19,33,153,48,131,75,0,89,115,7,141,22,116,58,133,14,129,61,142,37,94,20,82,98],[136,84,21,130,104,112,87,123,129,61,114,3,119,36,147,117,62,142,68,148,47,91,66,58,105,23,44,13,121,159,89,125,151,85,154,0,40,122,45,10,59,39,37,53,60,149,138,95,158,64,107,88,98,38,141,51,103,160,157,145,139,109,79,120,34],[142,85,11,23,147,95,19,69,64,108,42,93,57,126,99,92,136,113,32,71,14,83,112,58,46,150,38,153,132,146,62,91,54,152,41,6,139,65,68,22,28,16,66,80,60,107,124,118,130,51,72,20,39,53,127,43,79,35,94,74,144,37,123,4,114],[46,53,33,64,65,130,96,73,31,114,92,158,82,43,134,44,126,145,83,71,143,20,122,133,104,34,151,80,87,19,119,78,101,153,67,5,103,29,125,135,102,137,61,110,98,155,85,36,107,18,77,55,32,72,148,50,9,152,111,91,112,49,115,140,60],[60,110,57,50,63,23,144,42,21,49,147,13,17,154,143,65,99,25,122,47,156,105,84,97,72,109,113,33,44,87,149,24,18,78,92,32,15,160,98,26,136,146,30,11,115,38,128,12,41,133,52,157,28,159,88,153,155,10,135,107,62,80,132,31,119],[115,57,25,72,143,29,136,97,96,9,28,8,86,1,140,109,133,122,14,150,81,13,15,30,88,19,33,36,128,153,120,111,137,10,104,52,45,112,101,126,84,145,99,59,51,16,70,146,23,113,32,79,31,61,116,7,92,103,0,132,49,47,144,154,35],[40,131,119,6,25,4,100,29,53,134,113,72,24,15,97,32,0,95,124,49,26,126,50,66,112,110,47,61,10,85,73,65,58,41,20,120,118,91,1,139,79,149,122,22,116,150,51,23,60,16,86,13,90,128,145,143,8,136,69,37,130,107,27,127,81],[6,158,78,94,45,150,157,46,134,82,32,50,75,114,69,18,65,2,24,71,108,140,76,115,160,151,120,83,40,38,87,133,1,60,113,131,86,33,111,153,147,91,30,154,59,36,109,132,26,11,37,104,58,9,51,92,155,28,88,14,146,41,31,54,116],[81,126,117,74,54,102,95,122,91,39,10,93,115,35,24,86,25,77,42,130,7,118,64,53,47,82,66,84,147,49,37,59,145,151,144,71,11,68,61,20,129,103,116,80,3,100,28,0,44,63,2,155,14,125,88,19,22,148,33,75,45,72,30,157,97],[47,113,71,156,144,104,120,24,123,45,143,92,37,36,89,78,150,135,101,33,11,4,13,63,132,41,77,125,88,59,103,20,122,30,160,55,87,74,154,0,73,91,53,22,60,70,111,117,94,110,141,116,56,93,66,51,75,121,83,112,109,124,68,43,138],[72,114,93,131,82,74,155,160,53,7,101,148,143,44,17,15,127,71,66,132,92,31,26,153,98,9,57,105,5,135,32,86,42,75,8,1,76,64,80,126,115,152,59,136,112,120,103,55,56,151,13,109,48,130,89,45,147,22,69,10,146,50,134,18,6],[135,139,94,129,107,151,32,62,156,86,155,22,12,46,65,73,17,43,26,20,106,40,3,110,89,81,8,48,136,19,45,5,71,104,1,143,79,59,9,158,64,111,0,124,127,115,28,47,140,138,131,18,66,75,36,39,133,149,57,157,55,31,13,50,70],[156,146,40,11,113,77,60,150,71,35,107,58,57,118,75,126,7,14,72,149,66,46,56,123,73,28,16,84,0,41,6,158,116,140,148,10,70,151,15,38,22,5,88,141,87,160,76,78,122,63,127,3,138,18,82,42,13,49,89,83,98,19,59,43,133],[44,29,46,117,138,160,21,157,83,52,139,98,86,77,107,43,127,122,22,154,6,129,74,73,90,87,88,136,79,61,152,72,119,66,92,104,5,85,15,103,26,37,45,135,102,28,1,134,101,17,25,118,113,2,155,62,12,36,120,142,125,10,145,93,14],[55,135,22,98,121,130,160,15,61,147,45,106,100,124,89,3,152,7,5,43,38,123,9,81,111,142,44,119,86,18,30,84,33,129,99,125,133,134,26,65,153,139,96,113,66,104,1,8,132,112,128,47,102,56,6,105,41,122,64,107,118,120,73,83,29],[36,32,82,145,116,135,13,128,121,77,127,78,65,153,98,103,141,15,40,2,131,61,142,125,119,151,136,31,89,34,27,39,85,56,67,21,94,46,102,129,156,133,45,64,154,140,84,63,139,38,130,87,49,37,3,62,160,144,58,97,44,146,14,134,73],[152,115,134,133,145,63,149,142,5,9,87,119,126,82,97,121,72,110,19,40,129,23,20,38,88,48,140,35,11,47,153,141,70,151,156,42,6,51,113,139,55,43,100,109,69,57,91,65,114,105,108,7,122,89,146,1,29,94,33,41,8,68,54,107,56],[58,91,96,146,60,29,53,114,68,78,42,89,156,81,103,135,16,34,19,140,0,50,83,122,8,142,37,41,86,55,6,17,15,80,7,82,118,77,155,23,84,31,99,45,65,56,92,3,2,11,90,69,76,111,138,157,127,67,93,1,94,144,52,54,106],[39,0,71,146,36,18,100,89,124,87,93,68,77,23,1,130,63,25,112,160,65,104,132,151,145,27,88,128,123,134,19,13,127,29,120,41,81,61,21,66,91,15,75,95,133,149,59,94,31,131,118,105,22,44,16,108,4,28,78,129,137,142,74,53,96],[153,52,50,109,73,47,118,33,137,72,69,84,92,17,63,14,125,154,121,30,93,104,90,114,148,54,59,60,2,56,158,110,35,45,40,108,34,29,159,13,120,19,64,26,85,61,139,156,112,12,28,75,81,116,111,149,86,151,146,55,76,51,136,101,89],[13,63,87,82,148,25,47,32,69,20,131,37,41,88,119,143,23,91,123,43,142,99,6,18,12,56,72,4,67,106,96,54,154,76,114,55,16,86,73,53,93,68,31,126,22,34,136,71,8,137,27,107,38,138,151,78,61,122,156,83,145,66,35,105,51],[117,37,33,85,124,42,6,137,127,36,109,159,141,64,89,142,74,130,45,35,151,149,114,51,3,103,87,138,76,146,65,52,2,86,126,95,128,71,150,131,58,83,116,113,133,21,157,148,72,28,17,110,80,4,105,97,31,81,61,120,62,115,13,155,118]];

const numDecryptKey = numberKey.map( a => ((arg) => {
    const map = {};
    arg.forEach( (b,i) => { map[b] = i; } )
    return map;
})(a));

const edl = {};
emojiList.forEach((d,i) => {
    edl[d] = i;
});
const emojiDecryptList = edl;

const b64 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/','='];

const b64Decrypt = {};
for(let i=0;i!==b64.length;i++)
{
    b64Decrypt[b64[i]]=i;
}

const generateKey = () =>
{
    const emoji_length = 161;
    let result = [];
    for(let i = 0 ; i !== 65; i++)
    {
        const current = [];
        const set = new Set();
        while(current.length !== 65)
        {
            const num = Math.floor(emoji_length * Math.random());
            if(num < emoji_length && !set.has(num))
            {
                set.add(num)
                current.push(num);
            }
        }
        result.push(current)
    }
    return JSON.stringify(result);
}
/*console.log({
    b64,
    b64Decrypt,
    emojiList,
    emojiDecryptList,
    numberKey,
    numDecryptKey
});*/

module.exports = {
    b64,
    b64Decrypt,
    emojiList,
    emojiDecryptList,
    numberKey,
    numDecryptKey
};