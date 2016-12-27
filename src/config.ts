module.exports = {
    NAME : 'Auto Inject Version',
    SHORT : 'AIV',
    PATH_PACKAGE : './package.json',
    NON_WEBPACK_COMPONENTS : [
        {
            option  : 'autoIncreaseVersion',
            path    : './components/auto-inc-version'
        },
        {
            option  : 'autoIncreaseBuild',
            path    : './components/auto-inc-build'
        }
    ],
    WEBPACK_COMPONENTS : [
        {
            option  : 'injectByTag',
            path    : './components/inject-by-tag'
        },
        {
            option  : 'injectAsComment',
            path    : './components/inject-as-comment'
        }
    ],
    LOGS_TEXT : {
        AIS_START   : 'Auto inject version started'
    }
}