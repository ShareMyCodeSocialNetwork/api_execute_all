import {Request, Response} from "express";
import {exec} from "child_process";
import * as fs from "fs";


/**
 * Assign a excution to one or many tasks
 */
export async function jsExcution(request: Request, response: Response)
{
    const code = request.body.code;

    exec("docker start execjs-container", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        console.log(`start execjs-container`);
    });
    fs.writeFile('js-excution.js', code, function (err) {
        if (err) throw err;
    });
    exec('docker cp "js-excution.js" execjs-container:"/" ', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            return;
        }
        exec("docker exec -tt execjs-container node js-excution.js  ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }


            console.log(`stdout:\n${stdout}`);
            response.send({response: stdout});
            response.status(200).end();
        });
    });

    setTimeout(() => {
        exec("docker stop execjs-container", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        });
        console.log(`stop execjs-container`);
    }, 2000);



}