/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const socket = io()

const form = document.querySelector('form')
const { dist } = form
const { al } = form
const { sp } = form
const { sa } = form
const { og } = form
const { ov } = form

form.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('sendVotes', {
        distrikt: dist.value,
        alvotes: al.value,
        spvotes: sp.value,
        savotes: sa.value,
        ogvotes: og.value,
        ovvotes: ov.value,
    })

    al.value = '0'
    sp.value = '0'
    sa.value = '0'
    og.value = '0'
    ov.value = '0'
})
