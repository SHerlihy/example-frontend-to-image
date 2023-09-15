        var btnEl = document.createElement('button');
        btnEl.onclick = appendBtn;

        document.body.appendChild(btnEl);

        function appendBtn(){
            document.body.appendChild(document.createElement('button'));
        };
