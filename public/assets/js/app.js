function showNotification(error, type){
    if(type === '' || type === undefined){
        type = 'error';
    }
    var snackbar = document.querySelector('#app-snackbar');
    var data = {
        message: error,
        timeout: 2000
    };
    snackbar.MaterialSnackbar.showSnackbar(data);
}