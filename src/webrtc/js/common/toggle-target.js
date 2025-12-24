(function() {
    var btn = document.getElementById('targetToggleBtn');
    if (!btn) return;

    var base = document.querySelector('base');
    var isNewTab = !base || base.getAttribute('target') !== '_self';
    
    function updateState() {
        if (isNewTab) {
            if (base) base.setAttribute('target', '_blank');
            btn.textContent = 'Target: _blank';
            btn.classList.remove('self-target');
        } else {
            if (base) base.setAttribute('target', '_self');
            btn.textContent = 'Target: _self';
            btn.classList.add('self-target');
        }
    }

    btn.addEventListener('click', function() {
        isNewTab = !isNewTab;
        updateState();
    });

    updateState();
})();
