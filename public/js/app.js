$(document).ready(function () {
   
    const table = $('#submissions-table').DataTable({
        ajax: {
            url: '/get-submissions',
            dataSrc: '',
        },
        columns: [
            { data: 'name' },
            { data: 'email' },
            { data: 'message' },
            { data: 'createdAt', render: function(data) {
                return new Date(data).toLocaleString();
            }},

            {
                data: null, 
                render: function(data, type, row) {
                    return `<button class="btn btn-danger delete-button" data-id="${row.id}">Delete</button>`;
                }
            }
        ]
    });


    $('#dynamic-form').on('submit', function (e) {
        e.preventDefault();

        $('#loader').addClass('d-flex').show();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        $.ajax({
            type: 'POST',
            url: '/submit-form',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                $('#form-feedback').html('<div class="alert alert-success">Form submitted successfully!</div>');
                $('#dynamic-form')[0].reset();
              
                table.ajax.reload(null, false);
            },
            error: function () {
                $('#form-feedback').html('<div class="alert alert-danger">There was an error submitting the form.</div>');
            },
            complete: function () {
               
                $('#loader').removeClass('d-flex').hide();
            }
        });
    });


    $('#submissions-table').on('click', '.delete-button', function () {
        const submissionId = $(this).data('id');

        $('#loader').addClass('d-flex').show();

        $.ajax({
            type: 'DELETE',
            url: `/delete-submission/${submissionId}`,
            success: function (response) {
                $('#form-feedback').html('<div class="alert alert-success">Submission deleted successfully!</div>');
                table.ajax.reload(null, false); 
            },
            error: function () {
                $('#form-feedback').html('<div class="alert alert-danger">There was an error deleting the submission.</div>');
            },
            complete: function () {
                $('#loader').removeClass('d-flex').hide(); 
            }
        });
    });




});
