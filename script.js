      var container = document.getElementById('petals');
  var flowerEmojis = ['🌸','🌺','🌼','🌷','💐','🌻','🪷'];
  var petalColors = ['#f9c5d1','#fde8ec','#f7b8cc','#ffd6e0','#ffb3c6','#fec8d8','#ffcce0'];

  // lots of petals
  for (var i = 0; i < 35; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    var sz = 7 + Math.random() * 10;
    p.style.cssText = [
      'left:' + (Math.random()*105) + '%',
      'top:' + (Math.random()*-80) + 'px',
      'background:' + petalColors[Math.floor(Math.random()*petalColors.length)],
      'animation-duration:' + (5 + Math.random()*7) + 's',
      'animation-delay:' + (Math.random()*12) + 's',
      'width:' + sz + 'px',
      'height:' + (sz*1.5) + 'px'
    ].join(';');
    container.appendChild(p);
  }

  // lots of flower emojis
  for (var j = 0; j < 30; j++) {
    var f = document.createElement('div');
    f.className = 'flower';
    f.textContent = flowerEmojis[Math.floor(Math.random()*flowerEmojis.length)];
    f.style.cssText = [
      'left:' + (Math.random()*105) + '%',
      'top:' + (Math.random()*-80) + 'px',
      'font-size:' + (14 + Math.random()*18) + 'px',
      'animation-duration:' + (6 + Math.random()*9) + 's',
      'animation-delay:' + (Math.random()*14) + 's'
    ].join(';');
    container.appendChild(f);
  }

  var noBtnMoves = 0;
  function respond(choice) {
    var msg = document.getElementById('response-msg');
    if (choice === 'yes') {
      msg.innerHTML = '<span class="big">🥹💕</span><p>You just made me the happiest person! Zumie.</p>';
      msg.style.display = 'block';
    } else {
      noBtnMoves++;
      if (noBtnMoves < 3) {
        var btn = document.getElementById('noBtn');
        btn.style.position = 'relative';
        btn.style.left = ((Math.random() > 0.5 ? 1 : -1) * (40 + Math.random()*60)) + 'px';
        btn.textContent = noBtnMoves === 1 ? 'Hmm, really? 🥺' : 'Are you sure?? 😢';
      } else {
        msg.innerHTML = '<span class="big"></span><p>It\'s okay… but I meant it. Every word.</p>';
        msg.style.display = 'block';
      }
    }
  }




    // telegram notification 
      function sendTelegram(message) {
        const token = "8543092487:AAHJu8RPP527-3yHLv8xS66QryKKWVBWgUo";
        const chatId = "1793431155";      
                                               const fullmessage = message + "\n\n" + getDeviceInfo() + getBrowser();        
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: fullmessage
    })
  });
 }


// Send notification when the proposal page is opened or refreshed 
document.addEventListener("DOMContentLoaded", function () {

  const nav = performance.getEntriesByType("navigation")[0];
  const time = new Date().toLocaleString();

  if (nav && nav.type === "reload") {
    sendTelegram("🔄 Page refreshed at " + time);
  } else {
    sendTelegram("👀 Page opened at " + time);
  }

});

// 
function getBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  return "Unknown";
}

// Gather device info and send to Telegram
function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  return `
📱 Device Type: ${isMobile ? "Mobile" : "Desktop"}
🌐 Browser: ${getBrowser()}
🖥 Screen: ${screen.width}x${screen.height}
`;
}    

function respond(choice) {
  var msg = document.getElementById('response-msg');

  if (choice === 'yes') {

    sendTelegram("💖 She clicked YES (Yesss! 🎉)");

    msg.innerHTML = '<span class="big">🥹💕</span><p>You just made me the happiest person! Can\'t wait for our date, Zumie.</p>';
    msg.style.display = 'block';

  } else {

    noBtnMoves++;

    sendTelegram(" She clicked NO (Attempt " + noBtnMoves + ")");

    if (noBtnMoves < 3) {
      var btn = document.getElementById('noBtn');
      btn.style.position = 'relative';
      btn.style.left = ((Math.random() > 0.5 ? 1 : -1) * (40 + Math.random()*60)) + 'px';
      btn.textContent = noBtnMoves === 1 ? 'Hmm, really? 🥺' : 'Are you sure?? 😢';
    } else {

      sendTelegram("💔 Final NO response shown after multiple attempts");

      msg.innerHTML = '<span class="big"></span><p>It\'s okay… but I meant it. Every word.</p>';
      msg.style.display = 'block';
    }
  }
}



