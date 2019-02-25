const ora = require('ora');
const webp = require("../../.webp.js")

async function cli(cmd) {

    const spinner = ora('runing').start();
    const opt = {
        source: cmd,
        target: cmd
    };
    let spendTime = 0
    setInterval(() => {
        spendTime = spendTime + 1;
        spinner.text = 'running in ' + spendTime + 's...';
    }, 1000);

    try {
        const startTime = Date.now();
        const res = await webp(opt)
        spinner.succeed(`success after ${Date.now() - startTime}ms! \n  succ`);
        process.exit();
    } catch (e) {
        spinner.fail(['Ops!, something error!']);
        throw e;
    }
};

function sleep(timer) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timer);
    })
}


module.exports = cli;