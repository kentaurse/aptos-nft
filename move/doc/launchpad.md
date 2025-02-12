
<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad"></a>

# Module `0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002::launchpad`



-  [Struct `CreateCollectionEvent`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CreateCollectionEvent)
-  [Struct `BatchMintNftsEvent`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchMintNftsEvent)
-  [Struct `BatchPreMintNftsEvent`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchPreMintNftsEvent)
-  [Resource `CollectionOwnerObjConfig`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionOwnerObjConfig)
-  [Resource `CollectionConfig`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionConfig)
-  [Resource `Registry`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Registry)
-  [Resource `Config`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Config)
-  [Constants](#@Constants_0)
-  [Function `update_creator`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_creator)
-  [Function `set_pending_admin`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_set_pending_admin)
-  [Function `accept_admin`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_accept_admin)
-  [Function `update_mint_fee_collector`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_mint_fee_collector)
-  [Function `create_collection`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_create_collection)
-  [Function `mint_nft`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_mint_nft)
-  [Function `get_creator`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_creator)
-  [Function `get_admin`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_admin)
-  [Function `get_pendingadmin`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_pendingadmin)
-  [Function `get_mint_fee_collector`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee_collector)
-  [Function `get_registry`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_registry)
-  [Function `get_mint_fee`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee)
-  [Function `get_active_or_next_mint_stage`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_active_or_next_mint_stage)
-  [Function `get_mint_stage_start_and_end_time`](#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_stage_start_and_end_time)


<pre><code><b>use</b> <a href="">0x1::aptos_account</a>;
<b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::option</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::simple_map</a>;
<b>use</b> <a href="">0x1::string</a>;
<b>use</b> <a href="">0x1::string_utils</a>;
<b>use</b> <a href="">0x1::timestamp</a>;
<b>use</b> <a href="">0x4::collection</a>;
<b>use</b> <a href="">0x4::royalty</a>;
<b>use</b> <a href="">0x4::token</a>;
<b>use</b> <a href="">0xe18a6040d3d56e54f63b82358125949ecf23a70a897c897f04bb25d61a175d::collection_components</a>;
<b>use</b> <a href="">0xe18a6040d3d56e54f63b82358125949ecf23a70a897c897f04bb25d61a175d::mint_stage</a>;
<b>use</b> <a href="">0xe18a6040d3d56e54f63b82358125949ecf23a70a897c897f04bb25d61a175d::token_components</a>;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CreateCollectionEvent"></a>

## Struct `CreateCollectionEvent`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CreateCollectionEvent">CreateCollectionEvent</a> <b>has</b> drop, store
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchMintNftsEvent"></a>

## Struct `BatchMintNftsEvent`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchMintNftsEvent">BatchMintNftsEvent</a> <b>has</b> drop, store
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchPreMintNftsEvent"></a>

## Struct `BatchPreMintNftsEvent`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_BatchPreMintNftsEvent">BatchPreMintNftsEvent</a> <b>has</b> drop, store
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionOwnerObjConfig"></a>

## Resource `CollectionOwnerObjConfig`

Unique per collection
We need this object to own the collection object instead of contract directly owns the collection object
This helps us avoid address collision when we create multiple collections with same name


<pre><code><b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionOwnerObjConfig">CollectionOwnerObjConfig</a> <b>has</b> key
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionConfig"></a>

## Resource `CollectionConfig`

Unique per collection


<pre><code><b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_CollectionConfig">CollectionConfig</a> <b>has</b> key
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Registry"></a>

## Resource `Registry`

Global per contract


<pre><code><b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Registry">Registry</a> <b>has</b> key
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Config"></a>

## Resource `Config`

Global per contract


<pre><code><b>struct</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_Config">Config</a> <b>has</b> key
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ALLOWLIST_MINT_STAGE_CATEGORY"></a>

Category for allowlist mint stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ALLOWLIST_MINT_STAGE_CATEGORY">ALLOWLIST_MINT_STAGE_CATEGORY</a>: <a href="">vector</a>&lt;u8&gt; = [65, 108, 108, 111, 119, 108, 105, 115, 116, 32, 109, 105, 110, 116, 32, 115, 116, 97, 103, 101];
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_DEFAULT_MINT_FEE_PER_NFT"></a>

Default mint fee per NFT denominated in oapt (smallest unit of APT, i.e. 1e-8 APT)


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_DEFAULT_MINT_FEE_PER_NFT">DEFAULT_MINT_FEE_PER_NFT</a>: u64 = 0;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_DEFAULT_PRE_MINT_AMOUNT"></a>

Default to mint 0 amount to creator when creating collection


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_DEFAULT_PRE_MINT_AMOUNT">DEFAULT_PRE_MINT_AMOUNT</a>: u64 = 0;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EAT_LEAST_ONE_STAGE_IS_REQUIRED"></a>

Creator must set at least one mint stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EAT_LEAST_ONE_STAGE_IS_REQUIRED">EAT_LEAST_ONE_STAGE_IS_REQUIRED</a>: u64 = 7;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EEND_TIME_MUST_BE_SET_FOR_STAGE"></a>

End time must be set for stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EEND_TIME_MUST_BE_SET_FOR_STAGE">EEND_TIME_MUST_BE_SET_FOR_STAGE</a>: u64 = 9;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EMINT_LIMIT_PER_ADDR_MUST_BE_SET_FOR_STAGE"></a>

Mint limit per address must be set for stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EMINT_LIMIT_PER_ADDR_MUST_BE_SET_FOR_STAGE">EMINT_LIMIT_PER_ADDR_MUST_BE_SET_FOR_STAGE</a>: u64 = 10;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ENOT_PENDING_ADMIN"></a>

Sender is not pending admin


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ENOT_PENDING_ADMIN">ENOT_PENDING_ADMIN</a>: u64 = 3;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ENO_ACTIVE_STAGES"></a>

No active mint stages


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ENO_ACTIVE_STAGES">ENO_ACTIVE_STAGES</a>: u64 = 6;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_SET_PENDING_ADMIN"></a>

Only admin can set pending admin


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_SET_PENDING_ADMIN">EONLY_ADMIN_CAN_SET_PENDING_ADMIN</a>: u64 = 2;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_UPDATE_CREATOR"></a>

Only admin can update creator


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_UPDATE_CREATOR">EONLY_ADMIN_CAN_UPDATE_CREATOR</a>: u64 = 1;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_UPDATE_MINT_FEE_COLLECTOR"></a>

Only admin can update mint fee collector


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_EONLY_ADMIN_CAN_UPDATE_MINT_FEE_COLLECTOR">EONLY_ADMIN_CAN_UPDATE_MINT_FEE_COLLECTOR</a>: u64 = 4;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ESTART_TIME_MUST_BE_SET_FOR_STAGE"></a>

Start time must be set for stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ESTART_TIME_MUST_BE_SET_FOR_STAGE">ESTART_TIME_MUST_BE_SET_FOR_STAGE</a>: u64 = 8;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ONE_HUNDRED_YEARS_IN_SECONDS"></a>

100 years in seconds, we consider mint end time to be infinite when it is set to 100 years after start time


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_ONE_HUNDRED_YEARS_IN_SECONDS">ONE_HUNDRED_YEARS_IN_SECONDS</a>: u64 = 3153600000;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_PUBLIC_MINT_MINT_STAGE_CATEGORY"></a>

Category for public mint stage


<pre><code><b>const</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_PUBLIC_MINT_MINT_STAGE_CATEGORY">PUBLIC_MINT_MINT_STAGE_CATEGORY</a>: <a href="">vector</a>&lt;u8&gt; = [80, 117, 98, 108, 105, 99, 32, 109, 105, 110, 116, 32, 115, 116, 97, 103, 101];
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_creator"></a>

## Function `update_creator`

Update creator address


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_creator">update_creator</a>(sender: &<a href="">signer</a>, new_creator: <b>address</b>)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_set_pending_admin"></a>

## Function `set_pending_admin`

Set pending admin of the contract, then pending admin can call accept_admin to become admin


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_set_pending_admin">set_pending_admin</a>(sender: &<a href="">signer</a>, new_admin: <b>address</b>)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_accept_admin"></a>

## Function `accept_admin`

Accept admin of the contract


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_accept_admin">accept_admin</a>(sender: &<a href="">signer</a>)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_mint_fee_collector"></a>

## Function `update_mint_fee_collector`

Update mint fee collector address


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_update_mint_fee_collector">update_mint_fee_collector</a>(sender: &<a href="">signer</a>, new_mint_fee_collector: <b>address</b>)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_create_collection"></a>

## Function `create_collection`

Create a collection, only admin or creator can create collection


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_create_collection">create_collection</a>(sender: &<a href="">signer</a>, description: <a href="_String">string::String</a>, name: <a href="_String">string::String</a>, uri: <a href="_String">string::String</a>, max_supply: u64, royalty_percentage: <a href="_Option">option::Option</a>&lt;u64&gt;, pre_mint_amount: <a href="_Option">option::Option</a>&lt;u64&gt;, allowlist: <a href="_Option">option::Option</a>&lt;<a href="">vector</a>&lt;<b>address</b>&gt;&gt;, allowlist_start_time: <a href="_Option">option::Option</a>&lt;u64&gt;, allowlist_end_time: <a href="_Option">option::Option</a>&lt;u64&gt;, allowlist_mint_limit_per_addr: <a href="_Option">option::Option</a>&lt;u64&gt;, allowlist_mint_fee_per_nft: <a href="_Option">option::Option</a>&lt;u64&gt;, public_mint_start_time: <a href="_Option">option::Option</a>&lt;u64&gt;, public_mint_end_time: <a href="_Option">option::Option</a>&lt;u64&gt;, public_mint_limit_per_addr: <a href="_Option">option::Option</a>&lt;u64&gt;, public_mint_fee_per_nft: <a href="_Option">option::Option</a>&lt;u64&gt;)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_mint_nft"></a>

## Function `mint_nft`

Mint NFT, anyone with enough mint fee and has not reached mint limit can mint FA
If we are in allowlist stage, only addresses in allowlist can mint FA


<pre><code><b>public</b> entry <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_mint_nft">mint_nft</a>(sender: &<a href="">signer</a>, collection_obj: <a href="_Object">object::Object</a>&lt;<a href="_Collection">collection::Collection</a>&gt;, amount: u64)
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_creator"></a>

## Function `get_creator`

Get creator, creator is the address that is allowed to create collections


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_creator">get_creator</a>(): <b>address</b>
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_admin"></a>

## Function `get_admin`

Get contract admin


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_admin">get_admin</a>(): <b>address</b>
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_pendingadmin"></a>

## Function `get_pendingadmin`

Get contract pending admin


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_pendingadmin">get_pendingadmin</a>(): <a href="_Option">option::Option</a>&lt;<b>address</b>&gt;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee_collector"></a>

## Function `get_mint_fee_collector`

Get mint fee collector address


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee_collector">get_mint_fee_collector</a>(): <b>address</b>
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_registry"></a>

## Function `get_registry`

Get all collections created using this contract


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_registry">get_registry</a>(): <a href="">vector</a>&lt;<a href="_Object">object::Object</a>&lt;<a href="_Collection">collection::Collection</a>&gt;&gt;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee"></a>

## Function `get_mint_fee`

Get mint fee for a specific stage, denominated in oapt (smallest unit of APT, i.e. 1e-8 APT)


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_fee">get_mint_fee</a>(collection_obj: <a href="_Object">object::Object</a>&lt;<a href="_Collection">collection::Collection</a>&gt;, stage_name: <a href="_String">string::String</a>, amount: u64): u64
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_active_or_next_mint_stage"></a>

## Function `get_active_or_next_mint_stage`

Get the name of the current active mint stage or the next mint stage if there is no active mint stage


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_active_or_next_mint_stage">get_active_or_next_mint_stage</a>(collection_obj: <a href="_Object">object::Object</a>&lt;<a href="_Collection">collection::Collection</a>&gt;): <a href="_Option">option::Option</a>&lt;<a href="_String">string::String</a>&gt;
</code></pre>



<a id="0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_stage_start_and_end_time"></a>

## Function `get_mint_stage_start_and_end_time`

Get the start and end time of a mint stage


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="launchpad.md#0x5be4aa46852694bf8a5d78dc34546a9f376986814b9d2f00bc12d5d3c48a8002_launchpad_get_mint_stage_start_and_end_time">get_mint_stage_start_and_end_time</a>(collection_obj: <a href="_Object">object::Object</a>&lt;<a href="_Collection">collection::Collection</a>&gt;, stage_name: <a href="_String">string::String</a>): (u64, u64)
</code></pre>
