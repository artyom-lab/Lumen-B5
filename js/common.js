$(document).ready(function() {

$(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) { 
    e.stopPropagation();
  });

$(".owl-4").owlCarousel({
  items: 1,
  smartSpeed: 1200,
  touchDrag: false,
  mouseDrag: false,
});

var owl1 = $(".owl-1");
owl1.owlCarousel({
  items: 1,
  smartSpeed: 1200,
  touchDrag: false,
  mouseDrag: false,
  loop: true,
});

$('body').on('click', '.click-slide', function() {
  $(this).find(owl1).trigger('next.owl.carousel');
  $(this).siblings(owl1).trigger('next.owl.carousel');
});

$('[data-bs-toggle="popover"]').popover()

Waves.attach('.wave', ['waves-light']);
Waves.attach('.wave2, .dropdown-2 .dropdown-menu a', ['waves-dark']);
Waves.init();

$(".close-metrics").on("click", function(){
  $(this).closest(".metric-alert").hide();
});

$(".close-box").on("click", function(){
  $(this).closest(".box-hide").hide();
});

$(".btn-play").on("click", function(){
  $(this).parents(".hidden-container").children(".box-hidden").show();
});

$('#sidebar-switcher').on('change', function() {
  if ($(this).is(':checked')) 
    $('.sidebar-2').addClass('sidebar-absolute');
  else 
    $('.sidebar-2').removeClass('sidebar-absolute');
});

$("#sandwich-1").on("click", function() {
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-1");
  $("html").toggleClass("o-hidden");
  $(".form-dropdown").toggleClass("form-transform");
  window.dispatchEvent(new Event('resize'));
});

$("#sandwich-2").on("click", function() { 
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-2");
  $("html").toggleClass("o-hidden");
});

$(".link-tablist").on("click", function() {
  window.dispatchEvent(new Event('resize'));
});

// DARK-MODE

$('#dark-mode').on('change', function() {
  if ($(this).is(':checked')) {
    $('body').addClass('dark-mode');
    darkModeChart();
  }
  else {
    $('body').removeClass('dark-mode');
    lightModeChart();
  }
});

// SIDEBAR-1

$(".sidebar-1").hover(function(){
  $(this).removeClass("sidebar-small");
});

$(".link-tablist").on("click", function(){
  if ($(this).hasClass('active')) 
    $('body').toggleClass('menubar-pitches');
  else 
    $('body').addClass('menubar-pitches');
});

if (window.matchMedia('(min-width: 1200px)').matches)
{
  $(".link-tablist").on("click", function(){
  $(".sidebar-1").addClass("sidebar-small");
    });
}

// FORMS

$(".btn-cross").on("click", function(){
  $(this).closest(".row-hidden").hide();
});

$(".btn-cancel-store").on("click", function(){
  $(".collapse-store").removeClass("show");
});

$(".btn-cancel-attr").on("click", function(){
  $(".collapse-attr").removeClass("show");
});

$(".news-select").on("click", function(){
  $(this).closest(".dropdown").removeClass("show");
  $(this).closest(".dropdown-menu").removeClass("show");
  $(".hidden-store").removeClass("d-none");
  $(".row-hidden").show();
});

  $("#v-pills-first-tab, #v-pills-second-tab, #v-pills-third-tab, #v-pills-fourth-tab, #v-pills-fifth-tab").on("click", function(){
    $(this).removeClass("done").prevAll().addClass("done");;
    $(this).nextAll().removeClass("done");
  });

// CHECKBOXES

$(document).ready(function () {
  var count_checked = $('.checkbox-block').find('input:checkbox:checked').length; 
  if (count_checked == 0)  {
    $(".metric-selected").hide();
  }
  $('.checkbox-block').find('input:checkbox').change(function () {
    if ($('.checkbox-block').find('input:checkbox:checked').length) {
      $('.metric-selected').hide();
      $('.checkbox-block').find('input:checkbox:checked').each(function () {
        $('.metric-selected[data-id*="' + $(this).attr('id') + '"]').show();
      }); 
    } else if(count_checked == 0) {
      $(".metric-selected").hide(); 
    }
  });
  $('.tag-list').find('.metric-selected').click(function () {
    $(this).closest(".metric-selected").hide(); 
    $('.checkbox-block').find('input:checkbox:checked[id=' + $(this).attr('data-id') + ']').prop("checked", false); 
  });
});


// CALENDAR

var start = moment("03/15/2023"),
    end   = moment("04/07/2023");

function cb(start, end) {
    $('#reportrange').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
};

$('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
}, cb);

cb(start, end);

$('input[name="birthday1"]').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  minYear: 2000,
  maxYear: parseInt(moment().format('YYYY'),10)
});

 // SELECT2

(function($) {
  var Defaults = $.fn.select2.amd.require('select2/defaults');
  $.extend(Defaults.defaults, {
    dropdownPosition: 'auto'
  });
  var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');
  var _positionDropdown = AttachBody.prototype._positionDropdown;
  AttachBody.prototype._positionDropdown = function() {
    var $window = $(window);
    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
    var newDirection = null;
    var offset = this.$container.offset();
    offset.bottom = offset.top + this.$container.outerHeight(false);
    var container = {
        height: this.$container.outerHeight(false)
    };
    container.top = offset.top;
    container.bottom = offset.top + container.height;
    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };
    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };
    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);
    var css = {
      left: offset.left,
      top: container.bottom
    };
    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;
    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }
    var parentOffset = $offsetParent.offset();
    css.top -= parentOffset.top
    css.left -= parentOffset.left;
    var dropdownPositionOption = this.options.get('dropdownPosition');
    if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
      newDirection = dropdownPositionOption;
    } else {
      if (!isCurrentlyAbove && !isCurrentlyBelow) {
        newDirection = 'below';
      }
      if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
        newDirection = 'above';
      } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
        newDirection = 'below';
      }
    }
    if (newDirection == 'above' ||
    (isCurrentlyAbove && newDirection !== 'below')) {
        css.top = container.top - parentOffset.top - dropdown.height;
    }
    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }
    this.$dropdownContainer.css(css);
  };
})(window.jQuery);

    $("select.select2").select2({
      dropdownPosition: 'below',
      allowClear: true
    });

// INPUTMASK

// $("#time").inputmask({
//   alias: "datetime",
//   inputFormat: "mm:ss",
//   hourFormat: "12"
// });

$(".input-time").inputmask("99:99",{numericInput:true, placeholder:"0"});

});

// DRAG-N-DROP

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}



