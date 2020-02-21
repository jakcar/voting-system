/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const socket = io()

socket.on('districtVotes', data => {
    let north = data[0]
    let south = data[1]

    const alVoteCountN = document.querySelector('#alvotesn')
    const spVoteCountN = document.querySelector('#spvotesn')
    const saVoteCountN = document.querySelector('#savotesn')
    const ovVoteCountN = document.querySelector('#ovvotesn')
    const ogVoteCountN = document.querySelector('#ogvotesn')
    const alVoteCountS = document.querySelector('#alvotess')
    const spVoteCountS = document.querySelector('#spvotess')
    const saVoteCountS = document.querySelector('#savotess')
    const ovVoteCountS = document.querySelector('#ovvotess')
    const ogVoteCountS = document.querySelector('#ogvotess')

    alVoteCountN.textContent = north.alVotes
    spVoteCountN.textContent = north.spVotes
    saVoteCountN.textContent = north.saVotes
    ovVoteCountN.textContent = north.ovVotes
    ogVoteCountN.textContent = north.ogVotes

    alVoteCountS.textContent = south.alVotes
    spVoteCountS.textContent = south.spVotes
    saVoteCountS.textContent = south.saVotes
    ovVoteCountS.textContent = south.ovVotes
    ogVoteCountS.textContent = south.ogVotes
})

socket.on('totalVotes', data => {
    const alVoteCountTot = document.querySelector('#alvotesntot')
    const spVoteCountTot = document.querySelector('#spvotesntot')
    const saVoteCountTot = document.querySelector('#savotesntot')
    const ovVoteCountTot = document.querySelector('#ovvotesntot')
    const ogVoteCountTot = document.querySelector('#ogvotesntot')

    alVoteCountTot.textContent = data.alVotes
    spVoteCountTot.textContent = data.spVotes
    saVoteCountTot.textContent = data.saVotes
    ovVoteCountTot.textContent = data.ovVotes
    ogVoteCountTot.textContent = data.ogVotes
})
