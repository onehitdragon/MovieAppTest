import webdriverio from "webdriverio";
import assert from "assert";

const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "5.1.1",
      deviceName: "Android Emulator",
      app: "C:\\Code\\client\\app-debug.apk",
      appPackage: "com.example.finalapp",
      appActivity: "com.example.finalapp.view.LoginRegisterActivity",
      automationName: "UiAutomator2"
    }
};

async function testCaseLoginSuccess(client){
	const btnLogin = await client.$("id:btnLogin");
    await btnLogin.click();

	const userField = await client.$("id:editTextUserName");
    await userField.click();
    await userField.setValue("A@gmail.com");

    const passField = await client.$("id:editTextPassword");
    await passField.click();
    await passField.setValue("12345");

    const loginButton = await client.$("id:btnLogin2");
    await loginButton.click();

    const mes = await client.$("id:textViewContent");
    assert.strictEqual(await mes.getText(), "Đăng nhập thành công");
    await client.pressKeyCode(66);
    await client.pressKeyCode(66);
}

async function testCaseAddLaterList(client){
    const firsMovieElement = await client.$$("id:recycleViewNewestList")[0];
    await client.touchAction({
        action: 'press',
        element: firsMovieElement
    });
    const selector = `new UiSelector().text("Thêm xem sau")`;
    const button = await client.$(`android=${selector}`)
    await button.click();

    const mes = await client.$("id:textViewContent");
    assert.strictEqual(await mes.getText(), "Đã thêm vào danh sách xem sau");
    await client.pressKeyCode(66);
    await client.pressKeyCode(66);
}

async function testCaseRemoveLaterList(client){
    const wrapBtnHistoryButton = await client.$("id:wrapBtnHistory");
    await wrapBtnHistoryButton.click();
    
    const firstLaterMovieElement = await client.$$("id:recycleViewLaterMovieList")[0];
    await client.touchAction({
        action: 'press',
        element: firstLaterMovieElement
    });

    const selector = `new UiSelector().text("Xóa khỏi xem sau")`;
    const button = await client.$(`android=${selector}`)
    await button.click();
}

async function main () {
    const client = await webdriverio.remote(opts);
    await client.unlock();
    await client.setImplicitTimeout(60000);

    try {
        await testCaseLoginSuccess(client);
        console.log("===================debug==============\n", "TestCaseLoginSuccess-Pass");
        
        await testCaseAddLaterList(client);
        await testCaseRemoveLaterList(client);
    } catch (error) {
        console.log(error);
        console.log("===================debug==============\n", "TestCaseLoginSuccess-Fail");
    }
    

    setTimeout(async () => {
      await client.deleteSession();
    }, 5000)
}

main();

// import WebSocket from "ws";
// import { exec } from "child_process";

// const cd = exec("bash chrome.sh");
// cd.stdout.on("data", (data) => {
// 	const socketUrl = data.trim().split(" ").at(-1);
// 	console.log(socketUrl);

// 	const ws = new WebSocket(socketUrl);
// 	ws.onopen = async () => {
// 		console.log("socket opened......");
// 		const result = await sendCommand(ws, {
// 			id: 1,
// 			method: "Target.getTargets"
// 		});
// 		console.log(result);
// 	}
// 	ws.onclose = () => {
// 		console.log("socket closed......");
// 	}
// });

// function sendCommand(ws, command){
// 	console.log("send...");
// 	ws.send(JSON.stringify(command));
// 	return new Promise((resolve) => {
// 		const onMessage = (res) => {
// 			const data = JSON.parse(res)
// 			if(data.id === command.id){
// 				resolve(data);
// 				ws.removeListener("message", onMessage);
// 			}
// 		}
// 		ws.on("message", onMessage);
// 	});
// }