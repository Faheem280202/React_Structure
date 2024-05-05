import React from 'react'


class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.addEventListener('focus', () => {
            navigator.serviceWorker.getRegistrations()
                .then(registrationsArray => {
                    if (registrationsArray.length !== 0) {
                        registrationsArray[0].update();
                    }
                });
        });

        window.addEventListener("click", () => {
            navigator.serviceWorker.getRegistrations()
                .then(registrationsArray => {
                    if (registrationsArray.length !== 0) {
                        registrationsArray[0].update();
                    }
                });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('focus', () => {
            navigator.serviceWorker.getRegistrations()
                .then(registrationsArray => {
                    if (registrationsArray.length !== 0) {
                        registrationsArray[0].update();
                    }
                });
        });
        window.removeEventListener('click', () => {
            navigator.serviceWorker.getRegistrations()
                .then(registrationsArray => {
                    if (registrationsArray.length !== 0) {
                        registrationsArray[0].update();
                    }
                });
        });
    }

    laterClick = () => {
        document.getElementById("new-updates").style.display = "none";
    }

    refreshPage = () => {
        if (caches) {
            caches.keys().then(async function (names) {
                await Promise.all(names.map(name => caches.delete(name)));
            });
        };
        document.getElementById("new-updates").style.display = "none";
        window.location.reload(true);
    }
    doSomething = (component) => {
        return (
            <>
                <ResponsiveAppBar />
                {component}
            </>
        )

    }

    render() {
        const Label = Labels[window.globalConfig.language];
        const { classes } = this.props;


        return (
            <div style={{ height: window.innerHeight }}>
                <div id='new-updates' className={classes.updateBoxStyle}>
                    <div className={classes.cardFirstContainer}>
                        <CardGiftcardIcon></CardGiftcardIcon>
                        <div className={classes.newVersionStyle}>{Label.message.newVersionAvailable}</div>
                    </div>
                    <div className={classes.laterClickStyle}>  {Label.message.clickLatestVersion}</div>
                    <div className={classes.buttonStyle}>
                        <Button onClick={this.laterClick} name={Label.message.later}></Button>
                        <div></div>
                        <div></div>
                        <Button name={Label.message.update} onClick={this.refreshPage}></Button>
                    </div>
                </div>

                <Routes>
                    {/* <Route path={Label.path.forgetPassword} Component={PasswordResetPage}></Route> */}
                </Routes>
            </div>
        )
    }
}

export default withStyles(styles)(Navigation)