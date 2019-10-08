$(document).ready(function () {
    //$(document).remove();
    var file = 'form2.json';
    var empty = "<span>Файл пустой</span>";


    $.getJSON(file, function(json) {
        if(typeof json === "undefined" ||  json ===  null) {
           $(" div.container ").after(empty);
        } else {
            $(" div.container ").append('<form>');
            $( " form ").attr("name", json["form"]["name"]);
            var items = json["form"]["items"];
            items.forEach(function(item, i, items) {
                if(item["type"] === "filler") {
                    $(" form ").before(item['message']);
                } else {
                    if (item["type"] != "button") {
                        setAttributes(item['label'], item['type'], item['name'], item['required'], item['value'], item['class'], item['disabled'], item['checked'], item['placeholder']);
                    } else if(item["type"] === "button") {
                        $(" form ").append('<br><input type=button value="' + item['text'] +'">');
                    }
                }
            });
            $("div.message").append(json["form"]["postmessage"]).hide();
        }
    });

    function setAttributes(label, type, name, required, value, className, disabled, checked, placeholder) {
        $(" form ").append('<p>' + label + '</p>');
        $(" form ").append('<input type="' + type + '" name="'+ name +'">');
        $("input[name=" + name +"]").prop('required', required);
        $("input[name=" + name +"]").prop('value', value);
        if(type === "checkbox") {
            $("input[name=" + name + "]").prop('checked', checked);
        }
        if(className != "") {
            $("input[name=" + name +"]").addClass(className);
        }
        if(placeholder != "") {
            $("input[name=" + name + "]").prop('placeholder', placeholder);
        }
        $("input[name=" + name +"]").prop('disabled', disabled);
    }


    $(document).on('click', 'input[type=button]', function () {
        $("p.required").remove();
        var placeholderText = $("input[type=text]").prop('placeholder');
        var placeholderTextarea = $("input[type=textarea]").prop('placeholder');
        var value;
        var flag = true;
        if(placeholderText != "") {
            value =  $("input[type=text]").prop('value');
            if(value === placeholderText) {
                $("input[type=text]").after('<p class="error">Значение поля не может быть таким же как placeholder('+ placeholderText +')!</p>');
                flag = false;
            } else {
                $("p.error").remove();
                flag = true;
            }
        }
        if(placeholderTextarea != "") {
            value =  $("input[type=textarea]").prop('value');
            if(value === placeholderTextarea) {
                $("input[type=textarea]").after('<p class="error">Значение поля не может быть таким же как placeholder('+ placeholderTextarea +')!</p>');
                flag = false;
            } else {
                $("p.error").remove();
                flag = true;
            }
        }
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
           if($(inputs[i]).prop("required") == true && $(inputs[i]).prop("value") == "") {
               $(inputs[i]).after('<p class="required">Это поле обязательно для заполнения!</p>');
               flag = false;
           }
        }
        if(flag) {
            $("div.message").show();
            $("p.required").remove();
        }
    });
});

