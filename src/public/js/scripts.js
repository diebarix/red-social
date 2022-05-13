$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    //slideToggle desliza el elemento, o lo quita al funcionarlo o lo muesta
    //esto funciona por jquery
    $('#post-comment').slideToggle()
});

//hace funcionar los likes
$('#btn-like').click(function (e) {
    e.preventDefault();
    let imageId = $(this).data('id');
    console.log(imageId)
    //la direccion de roter para saber a que imagen aumentart el like
    $.post('/images/' + imageId + '/like')
    .done(data => {
        console.log(data);
        //selecciona la clase likes-count del span y cambia el texto de su interior
        $('.likes-count').text(data.likes);
    });
});

$('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    //confirm es una pregunta del navegador que retornara un valor booleano
    const response = confirm('Are you sure you want to delete this image?');
    if (response) {
        let imageId = $this.data('id')
        //no utilizo post por que es una peticion delete, y se hara mediante ajax
        $.ajax({
            url: '/images/' + imageId,
            type: 'DELETE' 
        })
        //el .done es cuando termine la peticion y nos retorne algo, hacer lo siguiente...
        .done(function(result) {
            console.log(result)
            $this.removeClass('btn-danger').addClass('btn-success')
            $this.find('i').removeClass('fa-times').addClass('fa-check')
            //cambiar el texto
            $this.append('<span>Deleted!</span>')
        })
    }
})