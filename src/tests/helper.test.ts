import app from '../server';

before((done) => {
    app.on('appStarted', () => {
        console.log('\n\n\n================ STARTING TESTS ================\n')
        done();
    })
})

export default app;