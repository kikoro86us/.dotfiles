/*
 * quokka-vscode - v1.0.50
 * Copyright (c) 2017-2017 WallabyJs - All Rights Reserved.
 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}process.env.WALLABY_PRODUCTION=!0;var f="function"==typeof require&&require;module.exports=e(d[0])}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a("fs"),g=a("path"),h=a("vscode"),i=a("./lib/compositeDisposable"),j=h.window,k=function(){function b(){d(this,b)}return e(b,[{key:"activate",value:function(b){var c=this;c._disposables=new i,c._setupStatusIndicator();var d=a(b.globalState.get("corePath")),e={context:b,coreClient:d,statusBar:c._statusBar,deactivate:function(){return c.deactivate()}},f=a("./lib/controller");c._controller=new f(e),c._controller.activate(),c._disposables.add(function(){return c._controller.deactivate()})}},{key:"_setupStatusIndicator",value:function(){var a=this;a._statusBar=j.createStatusBarItem(h.StatusBarAlignment.Right,Number.NEGATIVE_INFINITY),a._statusBar.show();var b=a._statusBar.hide.bind(a._statusBar),c=a._statusBar.dispose.bind(a._statusBar);a._statusBar.hide=function(){a._statusBar.stopProgress(),b()},a._statusBar.dispose=function(){a._statusBar.stopProgress(),c()},a._statusBar.displayProgress=function(){var b=0,c=["[=-----]","[-=----]","[--=---]","[---=--]","[----=-]","[-----=]","[----=-]","[---=--]","[--=---]","[-=----]"];clearInterval(a._statusBar._progress),a._statusBar._progress=setInterval(function(){a._statusBar.setMainText(c[b=++b%c.length]+"   "),a._statusBar._doUpdateText()},150)},a._statusBar.setMainText=function(b){a._statusBar._mainText=b},a._statusBar.setExtensionText=function(b){a._statusBar._extensionText=b},a._statusBar.updateText=function(){return a._statusBar._doUpdateText()},a._statusBar._doUpdateText=function(){a._statusBar.text=(a._statusBar._mainText||"")+" "+(a._statusBar._extensionText||"")},a._statusBar.stopProgress=function(){clearInterval(a._statusBar._progress),delete a._statusBar._progress},a._statusUpdater=function(b){a._statusBar.tooltip=b},a._disposables.add(function(){a._removeStatusIndicator()})}},{key:"_hideStatusIndicator",value:function(){this._statusBar&&(this._statusBar.text="",this._statusBar.tooltip="",this._statusBar.hide()),this._statusUpdater=function(){}}},{key:"_removeStatusIndicator",value:function(){this._statusBar&&this._statusBar.dispose(),this._statusUpdater=function(){}}},{key:"deactivate",value:function(){this._disposables.dispose()}}]),b}();c.activate=function(a){var b=new k;a.subscriptions.push({dispose:function(){return b.deactivate()}});var c=process.exit,d=function(){b.deactivate(),c.apply(process,arguments)},e=process.exit=function(){d.apply(null,arguments)};process.on("SIGINT",function(){e.apply(null,arguments)}),process.on("SIGTERM",function(){e.apply(null,arguments)}),process.on("exit",function(){e.apply(null,arguments)});try{var i=h.workspace.getConfiguration();i&&!function(){var b=i.get("quokka.colors",{});b&&Object.keys(b).forEach(function(c){try{if(!c)return;var d=a.asAbsolutePath(g.join("images",c+".svg"));if(!f.existsSync(d))return;var e=f.readFileSync(d).toString().replace(/fill:#.[^;]*/,"fill:"+b[c]);f.writeFileSync(d,e)}catch(a){console.error("Failed to set icon "+c+" type to "+b[c]+". "+a.message)}})}()}catch(a){}b.activate(a)}},{"./lib/compositeDisposable":3,"./lib/controller":4,fs:void 0,path:void 0,vscode:void 0}],2:[function(a,b,c){"use strict";var d=a("vscode"),e=a("path");c.activate=function(b){var c=d.workspace.getConfiguration()&&d.workspace.getConfiguration().get("quokka.debug",!1);return c?(global.originalRequire=a,b.globalState.update("corePath","../wallaby/client")):b.globalState.update("corePath","./wallaby/client"),c||"dist"===e.basename(__dirname)?a("./extension").activate(b):(global.originalRequire=a,a("./dist/index").activate(b))}},{"./extension":1,path:void 0,vscode:void 0}],3:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a),this._disposables=[]}return e(a,[{key:"add",value:function(a){a.dispose?this._disposables.push(a):this._disposables.push({dispose:a})}},{key:"dispose",value:function(){this._disposables.forEach(function(a){return a.dispose()})}}]),a}();b.exports=f},{}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=function(a,b,c){for(var d=!0;d;){var e=a,f=b,g=c;d=!1,null===e&&(e=Function.prototype);var h=Object.getOwnPropertyDescriptor(e,f);if(void 0!==h){if("value"in h)return h.value;var i=h.get;if(void 0===i)return;return i.call(g)}var j=Object.getPrototypeOf(e);if(null===j)return;a=j,b=f,c=g,d=!0,h=j=void 0}},h=a("path"),i=a("fs"),j=a("os"),k=a("vscode"),l=global._,m=global.EventEmitter,n=a("./compositeDisposable"),o=a("./outputBuilder"),p=k.workspace,q=k.window,r=300,s=3500,t="quokka",u=0,v=["showOutput","createFile","makeQuokkaFromExistingFile","createJavaScriptFile","createTypeScriptFile","showInstrumentedFile","stopCurrent","stopAll","installMissingPackageToProject","installMissingPackageToQuokka","goToLineInQuokkaFile"],w={javascript:".js",javascriptreact:".js",plaintext:".js",typescript:".ts",typescriptreact:".tsx"},x=function(b){function c(a){d(this,c),g(Object.getPrototypeOf(c.prototype),"constructor",this).call(this);var b=this;this._state=a,this._context=a.context,this._statusBar=a.statusBar,this._Session=a.coreClient.Session,this._utils=a.coreClient.utils,this._outputDocumentSelector={language:"wallaby-output"},this._setupVersionSpecificComponents(k.version),this._disposables=new n,l.each(v,function(a){return b._disposables.add(k.commands.registerCommand("quokka."+a,function(c){return b[a](c)}))}),this._coverageDecorationTypes={1:b._createCoverageDecorationType("notCovered"),2:b._createCoverageDecorationType("covered"),3:b._createCoverageDecorationType("partiallyCovered"),4:b._createCoverageDecorationType("errorSource"),5:b._createCoverageDecorationType("errorPath")},this._hideAfterContentDecorationType=q.createTextEditorDecorationType({isWholeLine:!0,after:{margin:"0 0 0 -10000px"}}),this._debugOutputChannel={appendLine:function(a,b){console.log("%c "+a,"color: "+("error"===b?"red":"darkgreen"))}},this._activeSessions=[],this._setupEnvironment()}return e(c,b),f(c,[{key:"_setupEnvironment",value:function(){var a=this;this._quokkaFolder=h.join(j.homedir(),".quokka");try{i.existsSync(this._quokkaFolder)||i.mkdirSync(this._quokkaFolder)}catch(a){}var b=this._loadQuokkaConfig();b.pro!==!0&&b.pro!==!1&&(q.showInformationMessage("Would you like to enable All features or to only use the Free edition features?",{title:"All features",pro:!0},{title:"Basic features",pro:!1}).then(function(c){c&&(b.pro=c.pro,a._saveQuokkaConfig(b))}),q.showInformationMessage("You are using Quokka.js Free (will always be free). Quokka.js Pro (commercial) is not yet available, but you may use its features for free now.",{title:"More info",url:k.Uri.parse("https://quokkajs.com/pro")}).then(function(a){a&&a.url&&k.commands.executeCommand("vscode.open",a.url)}))}},{key:"_quokkaConfigPath",value:function(){return h.join(this._quokkaFolder,"config.json")}},{key:"_loadQuokkaConfig",value:function(){var b=this._quokkaConfigPath(),c={};try{delete a.cache[a.resolve(b)]}catch(a){}try{c=a(b)}catch(a){}return c}},{key:"_saveQuokkaConfig",value:function(a){i.writeFileSync(this._quokkaConfigPath(),JSON.stringify(a))}},{key:"_createCoverageDecorationType",value:function(a){return q.createTextEditorDecorationType({isWholeLine:!0,gutterIconPath:this._context.asAbsolutePath(h.join("images",a+".svg")).split("\\").join("/"),light:{after:{color:"errorSource"===a?"#c80000":"#0000ff"}},dark:{after:{color:"errorSource"===a?"#fe536a":"rgba(86, 156, 214, 1)"}}})}},{key:"createFile",value:function(){var a=this;q.showQuickPick(["JavaScript","TypeScript"]).then(function(b){return a._createLanguageFile(b)})}},{key:"showOutput",value:function(){this._activeSession&&this._activeSession.outputChannel&&this._activeSession.outputChannel.show()}},{key:"createJavaScriptFile",value:function(){this._createLanguageFile("JavaScript")}},{key:"createTypeScriptFile",value:function(){this._createLanguageFile("TypeScript")}},{key:"makeQuokkaFromExistingFile",value:function(){var a=q.activeTextEditor;if(a){var b=a.document;if(b){var c=this._activeSessions.find(function(a){return a.textDocument===b});c&&this._stop(c);var d=w[b.languageId];return d?void this._start(b,a):void q.showWarningMessage('Language "'+b.languageId+'" is not supported')}}}},{key:"stopCurrent",value:function(){var a=q.activeTextEditor,b=a&&a.document&&this._activeSessions.find(function(b){return b.textDocument===a.document})||this._activeSession;b&&this._stop(b)}},{key:"stopAll",value:function(){var a=this;this._activeSessions.slice().forEach(function(b){return a._stop(b)})}},{key:"showInstrumentedFile",value:function(){var a=this;this._activeSession&&this._activeSession.requestInstrumentedFile({path:this._activeSession.fileName},function(b){a._activeSession.output.clearAndRenderHeader(),a._activeSession.output.appendConsoleMessage({text:b,type:"warn"})})}},{key:"installMissingPackageToProject",value:function(){this._installPackage(!0)}},{key:"installMissingPackageToQuokka",value:function(){this._installPackage()}},{key:"goToLineInQuokkaFile",value:function(a){if(this._activeSession){if(!a)return void q.showTextDocument(this._activeSession.textDocument);a=a.split(",");var b=a[0]-1,c=(a[1]||1)-1;q.showTextDocument(this._activeSession.textDocument).then(function(a){var d=new k.Position(b,c);a.revealRange(new k.Range(d,d)),a.selection=new k.Selection(d,d)})}}},{key:"_installPackage",value:function(a){if(!this._activeSession)return void q.showWarningMessage("Cannot install a package because quokka is not running.");if(a&&!this._projectRoot)return void q.showWarningMessage("Cannot install a package into project because quokka is running outside of an opened project.");if(!this._activeSession.stats||!this._activeSession.stats.errors)return void q.showWarningMessage("No missing packages to install.");var b=l.find(this._activeSession.stats.errors,function(a){return a.missingPackage});return b&&b.missingPackage?(this._updateStatus(this._activeSession,"progress"),void this._activeSession.runTests({file:this._activeSession.fileName,installPackage:{name:b.missingPackage,local:a}})):void q.showWarningMessage("No missing packages to install.")}},{key:"_setupVersionSpecificComponents",value:function(a){var b=1,c=0;try{var d=a.split(".");b=parseInt(d[0],10),c=parseInt(d[1],10)}catch(a){return}b>=1&&c>=11&&(this._outputDocumentSelector.scheme="*")}},{key:"_createLanguageFile",value:function(a){var b=this;return a&&p.openTextDocument({language:a.toLowerCase()}).then(function(a){return q.showTextDocument(a).then(function(c){return b._start(a,c)})})}},{key:"_stop",value:function(a){a.disposable.dispose(),this._activeSessions.splice(this._activeSessions.findIndex(function(b){return b===a}),1),this._hideStatusIndicator()}},{key:"_hideStatusIndicator",value:function(){this._statusBar.stopProgress(),this._statusBar.hide()}},{key:"_relativeNormalizedFilePath",value:function(a){return this._utils.normalizePath(h.relative(this._projectRoot,a))}},{key:"_start",value:function(a,b){var d=this;c._updateConfigurationFromSettings(this._quokkaFolder),c._checkConfigurationSettings();var e=new this._Session,f=new n;this._watcher||(this._watcher=p.createFileSystemWatcher("**/*.*"),this._disposables.add(this._watcher)),f.add(k.languages.registerHoverProvider(a.languageId,{provideHover:function(b,c){if(b===a&&e.missingPackageError&&e.missingPackageError.line===c.line)return new k.Hover(e.missingPackageError.hover)}}));var g=function(){return e.runTests({file:e.fileName})};if(f.add(this._watcher.onDidCreate(g)),f.add(this._watcher.onDidChange(g)),f.add(this._watcher.onDidDelete(g)),e.disposable=f,e.textDocument=a,e.id=++u,e.changes=[],e.fileName=t+w[a.languageId],"file"===a.uri.scheme&&this._projectRoot){var i=this._relativeNormalizedFilePath(a.uri.fsPath);i&&(e.fileName=i)}e.editors=[b],e.liveConsoleOutput=[],this._activeSessions.push(e),f.add(p.onDidCloseTextDocument(function(b){a===b&&d._stop(e)})),f.add(p.onDidChangeTextDocument(function(b){a===b.document&&d._processDocumentContentChange(e,b.document,b.contentChanges)})),f.add(q.onDidChangeActiveTextEditor(function(b){var c=e.editors.length,d=e.editors.includes(b);e.editors=e.editors.filter(function(a){return q.visibleTextEditors.includes(a)});for(var f=0;f<c-e.editors.length;f++)e.fileClosedInEditor(e.fileName);q.visibleTextEditors.filter(function(b){return b.document===a}).forEach(function(a){e.editors.includes(a)||(e.editors.push(a),e.fileOpenedInEditor(e.fileName))}),d&&(e.fileClosedInEditor(e.fileName),e.fileOpenedInEditor(e.fileName))}));var j=q.createOutputChannel("Quokka #"+this._activeSessions.length);e.outputChannel=j,j.append("");var m=l.bind(this._absoluteFilePath,this),s=new o(j,e.fileName,m,this._state.coreClient.dmp,e.disposable,this._outputDocumentSelector,!!this._projectRoot);e.output=s,e.start({localRoot:this._projectRoot,quokkaFolder:this._quokkaFolder,client:"VSCode",fileName:e.fileName,editorTypeScript:h.join(process.mainModule.filename,"../../extensions/node_modules/typescript")}),e.on("notification",function(c){var e=[];if(c.suggestProEdition){var f=function(c){if(c){if(c.pro){var e=d._loadQuokkaConfig();e.pro=c.pro,d._saveQuokkaConfig(e),d.stopCurrent(),d._start(a,b)}c.url&&k.commands.executeCommand("vscode.open",c.url)}};e.push({title:'Switch to "Pro" edition (free beta)',pro:!0,command:f}),e.push({title:"More info",url:k.Uri.parse("https://quokkajs.com/pro"),command:f})}c.text=c.text.replace(/<br\/><br\/>/g," ").replace(/<[^>]*>/g,"");var g=[c.text].concat(e);q["show"+c.type.charAt(0).toUpperCase()+c.type.substr(1)+("info"===c.type?"rmation":"")+"Message"].apply(q,g).then(d._executeCommand),0===c.text.indexOf("Can not start node.js process")&&q.showInformationMessage('You may use the "node" setting to configure the location of node.',{title:"More info",url:k.Uri.parse("https://quokkajs.com/docs/configuration.html#nodejs-version")}).then(function(a){a&&a.url&&k.commands.executeCommand("vscode.open",a.url)})}),e.on("busy",function(){clearTimeout(d._statusUpdateTimeout),d._statusUpdateTimeout=setTimeout(function(){return d._updateStatus(e,"progress")},r),e.liveConsoleOutput=[],d._scheduleSessionIdleTimeout(e)}),e.on("stopped",function(){return d._hideStatusIndicator()}),e.on("started",function(){d._debugOutputChannel.appendLine("[Info]  #"+e.id+" Quokka.js started"),j.show(),q.showTextDocument(e.textDocument)}),e.on("stats",function(a){a&&(c._outputResults(s,a),e.stats=a,d._updateMissingPackageError(e)),d._updateStatus(e),delete e.liveConsoleOutput,c._sessionIsActive(e)}),e.on("live",function(a){e.fileChangedInEditor(e.fileName,e.textDocument.getText()),e.fileOpenedInEditor(e.fileName)}),e.on("configChanged",function(a){s.setHeaderData(a)}),e.on("documentUpdates",function(a){return d._updateDocuments(e,a)}),e.on("consoleError",function(a){a&&a.split("\n").forEach(function(a){return a&&d._debugOutputChannel.appendLine("[Error] #"+e.id+" "+a,"error")}),e.emit("stats",a)}),e.on("consoleLog",function(a){return a&&a.split("\n").forEach(function(a){return a&&d._debugOutputChannel.appendLine("[Info]  #"+e.id+" "+a)})}),e.on("consoleOutput",function(a){return d._displayLiveConsoleOutput(e,s,a)}),this._updateStatus(e,"progress"),f.add(function(){j.hide(),j.dispose(),e.stop(),d._clearDecorations(e),delete e.editors,delete e.disposable,delete e.outputChannel,delete e.output,e===d._activeSession&&delete d._activeSession,c._clearIdleSessionTimeout(e),d._debugOutputChannel.appendLine("[Info]  #"+e.id+" Quokka.js stopped")})}},{key:"_updateMissingPackageError",value:function(a){if(a.stats.errors){delete a.missingPackageError;var b=a.stats.errors.find(function(a){return a.missingPackage});if(b&&b.stack&&b.stack.length){var c=b.stack[b.stack.length-1];c&&c.loc&&c.loc.split&&(a.missingPackageError={line:parseInt(c.loc.split(":")[0],10)-1,hover:'[Install "'+b.missingPackage+'" package for the current quokka file](command:quokka.installMissingPackageToQuokka)\n            '+(this._projectRoot?'\n[Install "'+b.missingPackage+'" package into the project](command:quokka.installMissingPackageToProject)':"")})}}}},{key:"activate",value:function(){var a=this;this._onceDocumentStopsChanging=l.debounce(l.bind(this._onceDocumentStopsChanging,this),100),c._outputResults=l.debounce(l.bind(c._outputResults,this),100),this._statusBar.updateText=l.debounce(l.bind(this._statusBar.updateText,this._statusBar),200),this._executeCommand=l.bind(this._execute,this),this._projectRoot=p.rootPath||"",this._statusBar.command="quokka.showOutput",this._disposables.add(function(){a._statusBar&&a._statusBar.hide(),a._activeSessions.forEach(function(a){return a.disposable.dispose()}),a._activeSessions.length=0})}},{key:"deactivate",value:function(){this._disposables.dispose()}},{key:"_sessionIsIdle",value:function(a){this._clearDecorations(a),delete a.stats,a.liveConsoleOutput&&!a.liveConsoleOutput.started&&a.output.clearAndRenderHeader()}},{key:"_clearDecorations",value:function(a){var b=this;a.editors.forEach(function(a){l.each(b._coverageDecorationTypes,function(b){return a.setDecorations(b,[])}),a.setDecorations(b._hideAfterContentDecorationType,[])})}},{key:"_scheduleSessionIdleTimeout",value:function(a){var b=this;c._clearIdleSessionTimeout(a),a.idleTimeout=setTimeout(function(){return b._sessionIsIdle(a)},s)}},{key:"_displayLiveConsoleOutput",value:function(a,b,c){var d=this;if(a.liveConsoleOutput){var e=a.liveConsoleOutput.started;a.liveConsoleOutput=a.liveConsoleOutput.concat(c),a.liveConsoleOutput.started=e,a.liveConsoleOutput.started?a.displayLiveConsoleOutputTimeout||this._displayPendingLiveConsoleOutput(a,b):(a.liveConsoleOutput.started=!0,a.displayLiveConsoleOutputTimeout=setTimeout(function(){delete a.displayLiveConsoleOutputTimeout,a.liveConsoleOutput&&a.liveConsoleOutput.length&&(b.clearAndRenderHeader(),d._displayPendingLiveConsoleOutput(a,b))},150))}}},{key:"_displayPendingLiveConsoleOutput",value:function(a,b){a.liveConsoleOutput.forEach(function(a){return b.appendConsoleMessage(a)}),a.liveConsoleOutput.length=0}},{key:"_execute",value:function(a){if(a&&a.command)return"function"==typeof a.command?a.command(a):~a.command.indexOf("quokka.")?k.commands.executeCommand(a.command):this[a.command]()}},{key:"_processDocumentContentChange",value:function(a,b,c){a.isDisposed()||b&&b.uri&&b.uri.scheme&&"file"!==b.uri.scheme&&"untitled"!==b.uri.scheme||(a.changes=a.changes.concat(c),this._hideMessagesForChangedRanges(a.changes),this._onceDocumentStopsChanging(a,b))}},{key:"_onceDocumentStopsChanging",value:function(a,b){var c=this;!a.isDisposed()&&a.changes.length&&(clearTimeout(this._statusUpdateTimeout),this._statusUpdateTimeout=setTimeout(function(){return c._updateStatus(a,"progress")},r),a.fileChangedInEditor(a.fileName,b.getText(),{start:l.chain(a.changes).map(function(a){return a.range.start.line}).min().value()+1,end:l.chain(a.changes).map(function(a){return a.range.end.line}).max().value()+1}),a.changes=[])}},{key:"_updateStatus",value:function(a,b){var c=void 0;clearTimeout(this._statusUpdateTimeout),b||(b=l.isString(a.stats)?"failing":a.stats?a.stats.errors.length?"failing":"passing":"failing",c=a.stats&&a.stats.time),b&&("progress"===b?this._statusBar.displayProgress():(this._statusBar.stopProgress(),this._statusBar.setMainText(("failing"===b?"✗":"✔")+(c?" "+c+"ms":"")),this._statusBar.updateText()),this._statusBar.show()),this._activeSession=a}},{key:"_updateStatusExtension",value:function(a){this._statusBar.setExtensionText(a),this._statusBar.updateText()}},{key:"_removeStatus",value:function(){this._statusBar.hide()}},{key:"_updateDocuments",value:function(a,b){var c=this;a.isDisposed()||l.each(q.visibleTextEditors,function(d){if(d.document===a.textDocument){var e=b[a.fileName];if(e&&e.lines){var f={1:[],2:[],3:[],4:[],5:[]};l.each(e.lines,function(a){var b={range:new k.Range(a.num-1,0,a.num-1,1e3)},c=a.log||a.err,d=a.longLog||c;d&&(b.hoverMessage={value:d}),f[a.state].push(b),c&&(b.renderOptions={after:{contentText:"  "+c}})}),l.each(f,function(a,b){return d.setDecorations(c._coverageDecorationTypes[b],a)}),c._scheduleHiddenMessagesDisplay()}}})}},{key:"_hideMessagesForChangedRanges",value:function(a){clearTimeout(this._displayHiddenMessagesTimeout),this._messagesHiddenAt=+new Date,q.activeTextEditor.setDecorations(this._hideAfterContentDecorationType,a.map(function(a){return{range:new k.Range(a.range.start.line,0,a.range.end.line,1e3)}}))}},{key:"_scheduleHiddenMessagesDisplay",value:function(){var a=this;clearTimeout(this._displayHiddenMessagesTimeout);var b=this._messagesHiddenAt?+new Date-this._messagesHiddenAt:400;this._displayHiddenMessagesTimeout=setTimeout(function(){try{l.each(q.visibleTextEditors,function(b){return b.setDecorations(a._hideAfterContentDecorationType,[])})}catch(a){}},Math.max(0,500-b))}},{key:"_navigate",value:function(a,b){if(a){var c=this._absoluteFilePath(a),d=void 0,e=void 0;l.isNumber(b)?d=b:l.isArray(b)?(d=b[0],e=b[1]):l.isString(b)&&(b=b.split(":"),d=b[0]&&parseInt(b[0],10),e=b[1]&&parseInt(b[1],10)),l.isNumber(d)?d-=1:d=0,l.isNumber(e)||(e=0),p.openTextDocument(c).then(function(a){return q.showTextDocument(a)}).then(function(a){var b=new k.Position(d,e);a.revealRange(new k.Range(b,b)),a.selection=new k.Selection(b,b)})}}},{key:"_absoluteFilePath",value:function(a){return h.resolve(this._projectRoot,a)}}],[{key:"_checkConfigurationSettings",value:function(){try{var a=k.workspace.getConfiguration();a&&!a.get("editor.glyphMargin",!0)&&q.showWarningMessage("Quokka.js will not display coverage indicators because the `editor.glyphMargin` setting is set to `false`.")}catch(a){}}},{key:"_updateConfigurationFromSettings",value:function(a){var b="";try{var c=h.join(a,"config.json");b=JSON.parse(i.readFileSync(c)).node}catch(a){}try{var d=k.workspace.getConfiguration();if(d){var e=d.get("quokka.node",b);e?process.env.WALLABY_NODE=e:delete process.env.WALLABY_NODE}}catch(a){}}},{key:"_sessionIsActive",value:function(a){c._clearIdleSessionTimeout(a)}},{key:"_clearIdleSessionTimeout",value:function(a){a.idleTimeout&&(clearTimeout(a.idleTimeout),delete a.idleTimeout)}},{key:"_outputResults",value:function(a,b,c){var d=void 0,e=a.lines();a.build(b);var f=a.lines();if(d=c||f.length!==e.length,!d)for(var g=0,h=f.length;g<h;g++)if(a.areDifferent(f[g],e[g])){d=!0;break}d&&a.render()}}]),c}(m);b.exports=x},{"./compositeDisposable":3,"./outputBuilder":5,fs:void 0,os:void 0,path:void 0,vscode:void 0}],5:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a("vscode"),g=global._,h={text:"",link:Array(2).join("​"),error:Array(3).join("​"),duration:Array(4).join("​"),suite:Array(5).join("​"),message:Array(6).join("​"),diffIns:Array(2).join("‌⁠"),diffDel:Array(2).join("‍"),tmpDiffInsOpen:"wsDiffIns",tmpDiffInsClose:"weDiffIns",tmpDiffDelOpen:"wsDiffDel",tmpDiffDelClose:"weDiffDel"},i=function(){function a(b,c,e,h,i,j,k){var l=this;d(this,a),this._lines=[],this._links=[],this._quokkaFileName=c,this._contentLimit=1048576,this._channel=b,this._absolutePathResolver=e,this._dmp=h,this._hasOpenedProject=k,this.render=g.debounce(g.bind(this.render,this),300),this._header=this._channel.name,i.add(f.languages.registerDocumentLinkProvider(j,{provideDocumentLinks:function(a){var b=a.lineAt(0);return b&&b.text&&~b.text.indexOf(l._channel.name)?l._links:[]}}))}return e(a,[{key:"build",value:function(a){var b=this;this._lines=[],this._links=[],this._appendLine("suite",0,this._header);var c=g.isString(a);c?this._appendLine("error",0,a):g.isObject(a)&&(g.each(a.errors,function(a){return b._outputError(a)}),g.each(a.messages,function(a){return b._outputMessage(a)}))}},{key:"lines",value:function(){return this._lines}},{key:"render",value:function(a){this._doRender(a)}},{key:"_doRender",value:function(a){!a&&this._channel.clear();for(var b="",c=0,d=this._lines.length;c<d;c++){var e=this._lines[c];if(b+=e+"\n",b.length>this._contentLimit){b+="\n--- output truncated to "+this._contentLimit+" bytes ---\n";break}}this._channel.append(b)}},{key:"clearAndRenderHeader",value:function(){this._lines=[],this._links=[],this._appendLine("suite",0,this._header),this._doRender(),this._lines=[]}},{key:"appendConsoleMessage",value:function(a){this._outputMessage(a),this._doRender(!0),this._lines=[]}},{key:"show",value:function(){this._channel.show(f.ViewColumn.Two)}},{key:"areDifferent",value:function(a,b){return a!==b}},{key:"setContentLimit",value:function(a){a&&(this._contentLimit=a)}},{key:"setHeaderData",value:function(a){this._header=this._channel.name+(" (node: "+a.nodeVersion+(a.ts?", TypeScript: "+(a.ts.version&&"v"+a.ts.version||"unknown version"):"")+(a.babel?", babel: "+(a.babel.version&&"v"+a.babel.version||"unknown version"):"")+")")}},{key:"_outputMessage",value:function(a){if("diff"===a.type){if(!a.context&&!a.actual&&!a.expected)return;a.text=a.context,delete a.context}a.context&&a.context.replace&&(a.context=a.context.replace(/\r\n\s*/g," ").replace(/\n\s*/g," "));var b=a.text&&(a.text.length>20||~a.text.indexOf("\n"))&&"diff"!==a.type,c="error"===a.type?"error":"warn"===a.type||"diff"===a.type?"duration":"message";if(b)this._appendLine(c,0,"\n"+a.text),this._outputLink(a,1);else{"diff"===a.type&&this._outputDiff(0,a.expected,a.actual);var d=a.text?"\n"+h[c]+a.text+h[c]:"";if(a.file){d+=" ";var e=h.link+a.file+(a.loc?":"+a.loc:"")+h.link;d+="at "+(a.context?h.duration+a.context+h.duration+" ":""),d+=e,this._addLink(a.file,a.loc,e,d.length-e.length,this._lines.length+1)}this._appendLine("text",0,d)}}},{key:"_outputError",value:function(a){var b=a.message,c=a.stack,d=a.expected,e=a.actual,i=a.missingPackage,j=this,k=0;if(this._outputDiff(k,d,e),i){var l='Install "'+i+'" package for the current quokka file',m=this._lines.length+1;if(this._appendLine("text",k,"\n"+h.link+l+h.link),this._links.push({range:new f.Range(m,h.link.length,m,l.length+h.link.length),target:f.Uri.parse("command:quokka.installMissingPackageToQuokka")}),this._hasOpenedProject){var n='Install "'+i+'" package into the project',o=this._lines.length;this._appendLine("text",k,h.link+n+h.link),this._links.push({range:new f.Range(o,h.link.length,o,n.length+h.link.length),target:f.Uri.parse("command:quokka.installMissingPackageToProject")})}}this._appendLine("error",k,"\n"+b),g.each(c,function(a){return j._outputLink(a,k+1)})}},{key:"_outputDiff",value:function(a,b,c){var d=this;this._dmp&&(b||c)&&!function(){var e="\n"+d._dmp.diff_prettyHtml(d._dmp.diff_wordMode(b||"",c||"")).replace(/&para;<br>/g,"\n").replace(/<br>/g,"\n").replace(/<\/?span[^>]*>/g,"").replace(/<ins[^>]*>/g,h.tmpDiffInsOpen).replace(/<del[^>]*>/g,h.tmpDiffDelOpen).replace(/<\/ins[^>]*>/g,h.tmpDiffInsClose).replace(/<\/del[^>]*>/g,h.tmpDiffDelClose).replace(/style="background:#e6ffe6;"/g,"").replace(/style="background:#ffe6e6;"/g,"").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/&gt;/g,">"),f=0,g=0;d._appendLine("none",a,e,void 0,void 0,function(a){if(!a)return a;f>0&&(a=h.diffIns+a),g>0&&(a=h.diffDel+a);var b=(a.match(new RegExp(h.tmpDiffInsOpen,"g"))||[]).length,c=(a.match(new RegExp(h.tmpDiffInsClose,"g"))||[]).length;f+=b-c;var d=(a.match(new RegExp(h.tmpDiffDelOpen,"g"))||[]).length,e=(a.match(new RegExp(h.tmpDiffDelClose,"g"))||[]).length;return g+=d-e,f>0&&(a+=h.diffIns),g>0&&(a+=h.diffDel),a.replace(new RegExp(h.tmpDiffInsOpen,"g"),h.diffIns).replace(new RegExp(h.tmpDiffInsClose,"g"),h.diffIns).replace(new RegExp(h.tmpDiffDelOpen,"g"),h.diffDel).replace(new RegExp(h.tmpDiffDelClose,"g"),h.diffDel)})}()}},{key:"_outputLink",value:function(a,b){var c=this;if(a.file){var d=a.file+(a.loc?":"+a.loc:"");this._appendLine("link",b,d,void 0,a.context,function(b,e){c._addLink(a.file,a.loc,d,e)})}}},{key:"_addLink",value:function(a,b,c,d,e){"."!==a[0]&&a!==this._quokkaFileName||(e=e||this._lines.length,this._links.push({range:new f.Range(e,d,e,d+c.length),target:0===a.indexOf("quokka")?f.Uri.parse("command:quokka.goToLineInQuokkaFile?"+JSON.stringify(this._location(b).substring(1))):f.Uri.parse(f.Uri.file(this._absolutePathResolver(a)).toString()+this._location(b))}))}},{key:"_location",value:function(a){var b=void 0,c=void 0;return g.isNumber(a)?b=a:g.isArray(a)?(b=a[0],c=a[1]):g.isString(a)&&(a=a.split(":"),b=a[0]&&parseInt(a[0],10),c=a[1]&&parseInt(a[1],10)),"#"+(g.isNumber(c)?b+","+(c+1):b)}},{key:"_appendLine",value:function(a,b,c,d,e,f){var i=this,j=c.split("\n"),k=h[a]||"";g.each(j,function(c){var j=(d?"["+d+"] ":"")+g.pad("",2*b,"   ")+("link"===a?"at "+(e?h.duration+e+h.duration+" ":""):"")+k,l=j+c+k;if(f){var m=f(l,j.length);m&&(l=m)}i._lines.push(l)})}}],[{key:"markupText",value:function(a,b){var c=h[a]||"";return""+c+b+c}}]),a}();b.exports=i},{vscode:void 0}]},{},[2]);