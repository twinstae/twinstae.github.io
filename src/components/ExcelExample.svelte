<script>
	let data = [3,5]; // let 변수는 상태 store입니다.
	
	const sum = (data) => data.reduce((acc, n) => acc + n, 0);
	$: total = sum(data); // 2. 변수가 변경되면 $: 로 선언된 값들이 재계산됩니다.
	$: count = data.length;
	$: avg = total / count;
</script>

<table class="excel">
	<thead>
		 <tr>
				<th></th>
				<th>A</th>
				<th style="width:100px">B</th>
				<th>C</th>
		 </tr>
	</thead>
	<tbody>
		 <tr>
				<th>0</th>
				<td><div class="cell" title="이름">이름</div></td>
				<td><div class="cell" title="선호도">선호도</div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
		 <tr>
				<th>1</th>
				<td><div class="cell" title="토끼">토끼</div></td>
				<td><div class="cell" title={data[0]}><input type="number" bind:value={data[0]}/></div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
		 <tr>
				<th>2</th>
				<td><div class="cell" title="고양">고양</div></td>
				<td><div class="cell" title={data[1]}><input type="number" bind:value={data[1]}/></div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
		 <tr>
				<th>3</th>
				<td><div class="cell" title="합계">합계</div></td>
				<td><div class="cell" title="= SUM(B1:B2)"><span style="color: var(--muted)">= SUM(B1:B2) </span> {total}</div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
		 <tr>
				<th>4</th>
				<td><div class="cell" title="사람 수">사람 수</div></td>
				<td><div class="cell" title="= COUNT(B1:B2)"><span style="color: var(--muted)">= COUNT(B1:B2) </span> {count}</div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
		 <tr>
				<th>5</th>
				<td><div class="cell" title="평균">평균</div></td>
				<td><div class="cell" title="= B3 / B4"><span style="color: var(--muted)">= B3 / B4 </span>{avg}</div></td>
				<td><div class="cell" title=""></div></td>
		 </tr>
	</tbody>
</table>

<style>
	input {
		color: green;
		padding: 0;
		font-size: 1.1rem;
		float: right;
		text-align: right;
		border: none;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>