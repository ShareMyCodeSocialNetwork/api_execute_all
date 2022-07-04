import {Request, Response} from "express";
import {exec} from "child_process";
import * as fs from "fs";


/**
 * Assign a excution to one or many tasks
 */
export async function pythonExcution(request: Request, response: Response)
{
    const code = request.body.code;
    console.log(code)
    let time = 0
    exec("docker start execpy-container", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        console.log(`start execpy-container`);
    });
    fs.writeFile('python-excution.py', code, function (err) {
        if (err) throw err;
    });
    exec("docker cp 'python-excution.py' execpy-container:'/' ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            return;
        }
        exec("docker exec -tt execpy-container python3 python-excution.py  ", (error, stdout, stderr) => {
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
        exec("docker stop execpy-container", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        });
        console.log(`stop execpy-container`);
    }, 2000);



}