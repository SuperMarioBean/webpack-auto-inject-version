const config  = require('../config');
const path    = require('path');
const fs      = require('fs');
const Promise = require('bluebird');
const log   = require('../core/log');

class IncBuild{

    private packageFile;
    private resolve;
    private reject;

    constructor(private context) {}

    public apply() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.start();
        });
    }

    /**
     * Start build increase
     */
    private start() {
        this.packageFile = this.openPackageFile();
        this.build();
    }

    /**
     * Open package file
     * @returns {any}
     */
    private openPackageFile() {
        return JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
    }

    /**
     * Close & save package file
     * @param newBuild
     */
    private closePackageFile(newBuild) {
        this.packageFile.build = newBuild;
        fs.writeFile(path.normalize(config.PATH_PACKAGE), JSON.stringify(this.packageFile, null, 4), (err) => {
            if(err) {this.reject(err); return console.log(err);}
            log.info(`autoIncBuild : new build : ${newBuild}`)
            log.info('package.json updated!');
            this.context.build = newBuild;
            this.resolve();
        });
    }

    private build() {
        let newBuild = this.packageFile.build + 1;
        this.closePackageFile(newBuild);
    }
}

module.exports = IncBuild;