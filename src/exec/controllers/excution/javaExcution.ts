import {Request, Response} from "express";
import {exec} from "child_process";
import * as fs from "fs";


/**
 * Assign a excution to one or many tasks
 */
export async function javaExcution(request: Request, response: Response)
{
    const code = request.body.code;

    exec("docker start execjv-container", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        console.log(`start execjv-container`);
    });
    fs.writeFile('ruby-excution.rb', code, function (err) {
        if (err) throw err;
    });
    exec("docker cp 'ruby-excution.rb' execjv-container:'/' ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            return;
        }
        exec("docker exec -tt execrb-container ruby ruby-excution.rb ", (error, stdout, stderr) => {
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
        exec("docker stop execrb-container", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        });
        console.log(`stop execrb-container`);
    }, 2000);

}