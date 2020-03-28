import osjs from 'osjs';
import {name as applicationName} from './metadata.json';

let filePath="Hello World";

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', {args, options, metadata});

  // Create  a new Window instance
 proc.createWindow({
 	attributes: {
    	closeable:true
  	},
 
    title: metadata.title.en_EN,
    dimension: {width: 400, height:260},
    position: 'bottomleft'
  })
  .on('destroy', () => proc.destroy())
  .render(($content, win) => {
//  	if (window.mobile === true)
//		win.maximize();  	
    // Add our process and window id to iframe URL
    

	if (proc.args.file) {
		if (proc.args.file.path != "restored") {
	    	let path=  core.getUser().username + "/" + proc.args.file.path.replace(/^home:\//, '');

 		    var suffix = `?pid=${proc.pid}&wid=${win.wid}&path=${path}`;
 	    
	//		proc.args.file.path="none";
			proc.args.file.path= "restored";
		}

	

		else {
			var suffix = `?pid=${proc.pid}&wid=${win.wid}&path=${path}`;
//			var suffix = `?pid=${proc.pid}&wid=${win.wid}`;

		}
	}
	
	else {
		var suffix=""
	}
    // Create an iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = proc.resource('/data/index.html') + suffix;
    iframe.setAttribute('border', '0');

    // Bind window events to iframe
    win.on('blur', () => iframe.contentWindow.blur());
    win.on('focus', () => iframe.contentWindow.focus());
   	proc.on('iframe:post', msg => iframe.contentWindow.postMessage(msg, window.location.href));
  	proc.on('attention', (args) => {
 // 		alert("index.js: 55");
  		let path= core.getUser().username + "/" + args.file.path.replace(/^home:\//, '');
//		alert("index.js:55 " + path);
		proc.emit('iframe:post', ['Play', path]);
  	//	iframe.contentWindow.postMessage(['Play', 'Sheep.midi']);
 
  	});	
    // Listen for messages from iframe
    // and send to server (via websocket)
    win.on('iframe:get', msg => {
      proc.send(msg);
    });
	if (window.mobile === true)
		win.maximize();
//	if (proc.args.file)
//		alert(proc.args.file.path);
//  	proc.args= "";	//prevents playing on session reload
    $content.appendChild(iframe);
  });
  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
