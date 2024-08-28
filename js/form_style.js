jQuery(document).ready(function ($) {
  // Use only the functions needed for your form and remove the unneeded ones. Update any variables and element classes/IDs as needed to match the elements in the form.
  // Back to Top button (should be included on all forms since users have varying screen sizes.)
  $(function () {
      var $btn = $('#btnTop');
      var $home = $('#top');
      var startpoint = $home.scrollTop() + $home.height();
      $(window).on('scroll', function () {
          if ($(window).scrollTop() > startpoint) {
              $btn.show();
          } else {
              $btn.hide();
          }
      });
  });

  // Confirm emails match
  $("#Confirm_Email").blur(function () {
      $("#Email").val($("#Email").val().toLowerCase());
      $("#Confirm_Email").val($("#Confirm_Email").val().toLowerCase());
      var Email = $("#Email").val();
      var Confirm_Email = $("#Confirm_Email").val();
      if (Confirm_Email != "" && Confirm_Email != "_@_._" && Confirm_Email != Email) {
          alert("The email addresses need to match.");
          $("#Confirm_Email").val("");
          $("#Confirm_Email").focus();
      }
  });

  // Datepicker
  // See https://jqueryui.com/datepicker/ for documentation and additional parameters
  $('#Date').datepicker({
      changeYear: true,
      dateFormat: 'MM d, yy',
      onSelect: function (dateText, inst) {
          this.value = $.datepicker.formatDate('MM d, yy', new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay));
          $(this).change();
      }
  });

  // Show/Hide Dropdown Other field
  $("#Dropdown").change(function () {
      var Dropdown = $(this).val();
      if (Dropdown == "Other") {
          $("#Dropdown_Other_div").show();
          $("#Dropdown_Other").prop("required", true);
      } else {
          $("#Dropdown_Other_div").hide();
          $("#Dropdown_Other").val("").removeAttr("required");
      }
  });

  // Show/Hide Radio buttons stacked info field
  $('input:radio[name="Radio_buttons_stacked"]').change(function () {
      if ($(this).val() == "Option 2") {
          $("#Radio_buttons_stacked_info_div").show();
          $("#Radio_buttons_stacked_info").prop("required", true);
      } else {
          $("#Radio_buttons_stacked_info_div").hide();
          $("#Radio_buttons_stacked_info").val("").removeAttr("required");
      }
  });

  // Show/Hide Checkboxes stacked info field
  $('#Checkbox_stacked_2').click(function () {
      $('#Checkbox_stacked_info_div')[this.checked ? "show" : "hide"]();
      if ($(this).checked) {
          $("#Checkbox_stacked_info").prop("required", true);
      } else {
          $("#Checkbox_stacked_info").val("").removeAttr("required");
      }
  });

  // Auto-populate the date
  let today = new Date();
  $('#signature_date').val(today.toISOString().split('T')[0]);
  $('#signature_date').change(function() {
      $(this).val(today.toISOString().split('T')[0]);
  });

  // File Upload Validation
  $('input[type=file]').change(function () {
      // File type validation
      var e = this;
      var allowedExtensions = ["JPG", "JPEG", "PNG", "GIF", "PDF", "DOC", "DOCX", "XLS", "XLSX",];
      var fileLength = e.files.length;
      for (var i = 0; i < fileLength; i++) {
          var file = e.files[i];
          var fileName = file.name;
          var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1).toUpperCase();
          if (allowedExtensions.indexOf(fileExt.toUpperCase()) === -1) {
              alert("File type: " + fileExt + " is not an allowed file type. Please ensure that you select a file that is one of the types listed above the File Upload field.");
              e.value = '';
              $(e).parent().next('.size').find('span').html("0");
              return;
          }
      }

      // File size validation
      var total_file_size = 0;
      var total_field_size = 0;
      $('input[type=file]').not(e).parent().next('.size').find('span.size_hidden_value').each(function () {
          total_file_size += parseFloat($(this).html()) * 1024 * 1024;
      });
      console.log("Total File Size: " + total_file_size);

      var upload_files = $(e).get(0).files;
      console.log("Total Number of Files: " + upload_files.length);
      for (i = 0; i < upload_files.length; i++) {
          total_field_size += upload_files[i].size;
          total_file_size += upload_files[i].size;
          console.log("Total Field Size: " + total_field_size);
          console.log("Total File Size (updated): " + total_file_size);
          if (total_file_size > 26214400) {
              alert("The total size of the file(s) you are uploading cannot exceed 25 MB. Please check your files and try again.");
              e.value = '';
              $(e).parent().next('.size').find('span').html("0");
              return;
          }
      }
      var field_MB_size = total_field_size / 1024 / 1024;
      if (field_MB_size >= 10) {
          var field_display_size = Math.round(field_MB_size);
      } else if (field_MB_size >= 1) {
          var field_display_size = Math.round((field_MB_size + Number.EPSILON) * 10) / 10;
      } else {
          var field_display_size = Math.round((field_MB_size + Number.EPSILON) * 100) / 100;
      }
      console.log("Field MB Size: " + field_MB_size);
      console.log("Field Display Size: " + field_display_size);
      $(e).parent().next('.size').find('span.size_hidden_value').html(field_MB_size);
      $(e).parent().next('.size').find('span.size_display_value').html(field_display_size);
  });

  // Additional validation to occur when the form is submitted
  $('#submit').click(function () {
      // Validate required checkboxes.
      Required_checkboxes = $("#required_checkboxes input[type=checkbox]:checked").length;
      if (!Required_checkboxes) {
          $('html, body').animate({
              scrollTop: $("#required_checkboxes").offset().top
          });
          $('#required_checkboxes').css({
              "border-color": "rgba(255,0,0,0.5)",
              "box-shadow": "0 0 3px #bbb",
          });
          $("#required_checkboxes .text-danger").show();
          return false;
      }
  });
  
  // Clear red border if checkbox is marked.
  $('.required_checkboxes input[type=checkbox]').change(function () {
      if (this.checked) {
          $(this).parents().eq(1).css({
              "border-color": "transparent",
              "box-shadow": "none",
          });
          $(this).parents().eq(1).children(".text-danger").hide();
      }
  });
});