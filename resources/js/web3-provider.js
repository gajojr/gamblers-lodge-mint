var walletConnected = false;
var currentWallet = '';
var whiteListActive = false;
var whiteListed = false;
var price = 0.012;
const polygonMainnetAddress = '0xdcFbD4bE3aEE0ac04b36AcF4f548f7A3750742B3';
const polygonTestnetAddress = '0x0dd8D416b6819d4ac1583ec44B355108354748A7';

const abi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_symbol',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_initBaseURI',
				type: 'string',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'approved',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'approved',
				type: 'bool',
			},
		],
		name: 'ApprovalForAll',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'addressMintedBalance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'approve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'baseExtension',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'baseURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'cost',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'getApproved',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
		],
		name: 'isApprovedForAll',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'isWhitelisted',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'maxMintAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'maxSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_mintAmount',
				type: 'uint256',
			},
		],
		name: 'mint',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'nftPerAddressLimit',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'onlyWhitelisted',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'ownerOf',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bool',
				name: '_state',
				type: 'bool',
			},
		],
		name: 'pause',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'paused',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes',
			},
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'approved',
				type: 'bool',
			},
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_newBaseExtension',
				type: 'string',
			},
		],
		name: 'setBaseExtension',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_newBaseURI',
				type: 'string',
			},
		],
		name: 'setBaseURI',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_newCost',
				type: 'uint256',
			},
		],
		name: 'setCost',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_limit',
				type: 'uint256',
			},
		],
		name: 'setNftPerAddressLimit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bool',
				name: '_state',
				type: 'bool',
			},
		],
		name: 'setOnlyWhitelisted',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_newmaxMintAmount',
				type: 'uint256',
			},
		],
		name: 'setmaxMintAmount',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4',
			},
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		name: 'tokenByIndex',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		name: 'tokenOfOwnerByIndex',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'transferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_owner',
				type: 'address',
			},
		],
		name: 'walletOfOwner',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address[]',
				name: '_users',
				type: 'address[]',
			},
		],
		name: 'whitelistUsers',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'whitelistedAddresses',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
];

window.addEventListener('DOMContentLoaded', async () => {
	const web3 = new Web3(window.ethereum);
	const chainId = await web3.eth.net.getId();
	console.log(chainId);

	if (chainId !== 80001) {
		// change to 137 for production
		Swal.fire({
			title: 'Error!',
			text: 'Your wallet is not on the mainnet, please switch to mainnet and refresh the page',
			icon: 'error',
			confirmButtonText: 'OK',
		});
		return;
	}

	const gamblersLodgeContract = new web3.eth.Contract(
		abi,
		polygonTestnetAddress // change to polygonMainnetAddress for production
	);
	const costOfNft = await gamblersLodgeContract.methods.cost().call();
	const maxPerMint = await gamblersLodgeContract.methods.maxMintAmount().call();

	console.log(web3.utils.fromWei(costOfNft, 'ether'));

	price = web3.utils.fromWei(costOfNft, 'ether');
	document.getElementById('priceOfNft').innerText = price;
	document.getElementById('totalPrice').innerText = price;

	const $connectWalletBtn = document.getElementById('connectWalletBtn');
	$connectWalletBtn.addEventListener('click', async () => {
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		const accounts = await web3.eth.getAccounts();
		console.log(accounts);
		currentWallet = accounts[0];

		whiteListActive = await gamblersLodgeContract.methods
			.onlyWhitelisted()
			.call();
		whiteListed = await gamblersLodgeContract.methods
			.isWhitelisted(currentWallet)
			.call();

		if (whiteListed || !whiteListActive) {
			walletConnected = true;
			Swal.fire({
				title: 'Connected',
				text: 'Your wallet is now connected, you can mint!',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		} else {
			Swal.fire({
				title: 'You are not whitelisted',
				text: 'Whitelist mint is active and you are not on whitelist!',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	});

	const $mintButton = document.getElementById('mintButton');
	$mintButton.addEventListener('click', async () => {
		if (!walletConnected) {
			Swal.fire({
				title: 'Error!',
				text: 'You must connect wallet first',
				icon: 'error',
				confirmButtonText: 'OK',
			});

			return;
		}

		if (!whiteListed && whiteListActive) {
			Swal.fire({
				title: 'You are not whitelisted',
				text: 'Whitelist mint is active and you are not on whitelist!',
				icon: 'error',
				confirmButtonText: 'OK',
			});

			return;
		}

		document.querySelector('.spinner-loader').style.display = 'block';

		const amountToMint = document.getElementById('amountToMint').value;

		try {
			const gasAmount = await gamblersLodgeContract.methods
				.mint(amountToMint)
				.estimateGas({
					from: currentWallet,
					value: web3.utils.toWei((amountToMint * price).toString(), 'ether'),
				});

			await gamblersLodgeContract.methods.mint(amountToMint).send({
				from: currentWallet,
				value: web3.utils.toWei((amountToMint * price).toString(), 'ether'),
				gasLimit: String(gasAmount + 5000),
			});

			document.querySelector('.spinner-loader').style.display = 'none';

			Swal.fire({
				title: 'Success!',
				text: 'Mint was successful!',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		} catch (err) {
			console.log(err);
			if (err.code === -32000) {
				Swal.fire({
					title: 'Error!',
					text: `Minting failed, you don't have enough ether to mint!`,
					icon: 'info',
					confirmButtonText: 'OK',
				});
			} else if (err.code === 4001) {
				Swal.fire({
					title: 'Error!',
					text: 'Signature declined!',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			} else {
				Swal.fire({
					title: 'Error!',
					text: 'Minting failed!',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}

			document.querySelector('.spinner-loader').style.display = 'none';
		}
	});

	document
		.getElementById('incrementAmountBtn')
		.addEventListener('click', () =>
			setMintAmount(
				Number(document.getElementById('amountToMint').innerText) + 1
			)
		);

	document
		.getElementById('decrementAmountBtn')
		.addEventListener('click', () =>
			setMintAmount(
				Number(document.getElementById('amountToMint').innerText) - 1
			)
		);

	function setMintAmount(value) {
		if (value > 0 && value <= maxPerMint) {
			document.getElementById('amountToMint').innerText = value;
			document.getElementById('totalPrice').innerText = (value * price).toFixed(
				3
			);
		}
	}
});
