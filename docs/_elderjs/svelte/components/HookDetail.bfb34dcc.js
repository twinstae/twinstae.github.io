import { j as element, y as text, k as claim_element, l as children, A as claim_text, d as detach_dev, n as attr_dev, o as add_location, i as insert_hydration_dev, E as append_hydration_dev, F as set_data_dev, g as dispatch_dev, z as space, B as claim_space, v as validate_each_argument, H as noop, G as destroy_each, s as validate_slots, S as SvelteComponentDev, w as init, x as safe_not_equal } from '../index-328232cc.js';

/* src/components/HookDetail.svelte generated by Svelte v3.46.4 */

const file = "src/components/HookDetail.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (71:2) {#if i || i === 0}
function create_if_block_2(ctx) {
	let span;
	let t0_value = /*i*/ ctx[1] + 1 + "";
	let t0;
	let t1;

	const block = {
		c: function create() {
			span = element("span");
			t0 = text(t0_value);
			t1 = text(".");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, t0_value);
			t1 = claim_text(span_nodes, ".");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "hook-number svelte-obuov5");
			add_location(span, file, 70, 20, 1172);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t0);
			append_hydration_dev(span, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*i*/ 2 && t0_value !== (t0_value = /*i*/ ctx[1] + 1 + "")) set_data_dev(t0, t0_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(71:2) {#if i || i === 0}",
		ctx
	});

	return block;
}

// (75:80) {:else}
function create_else_block(ctx) {
	let t_value = /*hook*/ ctx[0].hook + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, t_value);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*hook*/ 1 && t_value !== (t_value = /*hook*/ ctx[0].hook + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(75:80) {:else}",
		ctx
	});

	return block;
}

// (75:6) {#if hook.link && hook.link.length > 0}
function create_if_block_1(ctx) {
	let a;
	let t_value = /*hook*/ ctx[0].hook + "";
	let t;
	let a_href_value;

	const block = {
		c: function create() {
			a = element("a");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			t = claim_text(a_nodes, t_value);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a, "href", a_href_value = /*hook*/ ctx[0].link);
			add_location(a, file, 74, 45, 1319);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*hook*/ 1 && t_value !== (t_value = /*hook*/ ctx[0].hook + "")) set_data_dev(t, t_value);

			if (dirty & /*hook*/ 1 && a_href_value !== (a_href_value = /*hook*/ ctx[0].link)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(75:6) {#if hook.link && hook.link.length > 0}",
		ctx
	});

	return block;
}

// (84:29) {#each hook.props as prop}
function create_each_block_1(ctx) {
	let div;
	let t0_value = /*prop*/ ctx[6] + "";
	let t0;
	let t1;
	let div_aria_label_value;

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {
				class: true,
				"data-balloon-length": true,
				"data-balloon-pos": true,
				"aria-label": true
			});

			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "code svelte-obuov5");
			attr_dev(div, "data-balloon-length", "medium");
			attr_dev(div, "data-balloon-pos", "up");
			attr_dev(div, "aria-label", div_aria_label_value = /*hookEntityDefinitions*/ ctx[2][/*prop*/ ctx[6]]);
			add_location(div, file, 84, 6, 1554);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, t0);
			append_hydration_dev(div, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*hook*/ 1 && t0_value !== (t0_value = /*prop*/ ctx[6] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*hookEntityDefinitions, hook*/ 5 && div_aria_label_value !== (div_aria_label_value = /*hookEntityDefinitions*/ ctx[2][/*prop*/ ctx[6]])) {
				attr_dev(div, "aria-label", div_aria_label_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(84:29) {#each hook.props as prop}",
		ctx
	});

	return block;
}

// (91:31) {#each hook.mutable as mutable}
function create_each_block(ctx) {
	let div;
	let t0_value = /*mutable*/ ctx[3] + "";
	let t0;
	let t1;
	let div_aria_label_value;

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {
				class: true,
				"data-balloon-length": true,
				"data-balloon-pos": true,
				"aria-label": true
			});

			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "code svelte-obuov5");
			attr_dev(div, "data-balloon-length", "medium");
			attr_dev(div, "data-balloon-pos", "up");
			attr_dev(div, "aria-label", div_aria_label_value = /*hookEntityDefinitions*/ ctx[2][/*mutable*/ ctx[3]]);
			add_location(div, file, 91, 6, 1804);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, t0);
			append_hydration_dev(div, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*hook*/ 1 && t0_value !== (t0_value = /*mutable*/ ctx[3] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*hookEntityDefinitions, hook*/ 5 && div_aria_label_value !== (div_aria_label_value = /*hookEntityDefinitions*/ ctx[2][/*mutable*/ ctx[3]])) {
				attr_dev(div, "aria-label", div_aria_label_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(91:31) {#each hook.mutable as mutable}",
		ctx
	});

	return block;
}

// (98:2) {#if hook.advanced}
function create_if_block(ctx) {
	let div;
	let small;
	let t;

	const block = {
		c: function create() {
			div = element("div");
			small = element("small");
			t = text("This hook is an 'advanced' hook meaning it geared towards advanced users or plugins.");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			small = claim_element(div_nodes, "SMALL", {});
			var small_nodes = children(small);
			t = claim_text(small_nodes, "This hook is an 'advanced' hook meaning it geared towards advanced users or plugins.");
			small_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(small, file, 98, 9, 2002);
			add_location(div, file, 98, 4, 1997);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, small);
			append_hydration_dev(small, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(98:2) {#if hook.advanced}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div4;
	let t0;
	let div0;
	let span;
	let t1;
	let t2_value = /*hook*/ ctx[0].context + "";
	let t2;
	let t3;
	let div1;
	let raw_value = /*hook*/ ctx[0].use + "";
	let t4;
	let div2;
	let strong0;
	let t5;
	let t6;
	let t7;
	let div3;
	let strong1;
	let t8;
	let t9;
	let t10;
	let t11;
	let small;
	let t12_value = (/*hook*/ ctx[0].expiremental ? 'Expiremental' : 'Stable') + "";
	let t12;
	let t13;
	let t14_value = /*hook*/ ctx[0].location + "";
	let t14;
	let if_block0 = (/*i*/ ctx[1] || /*i*/ ctx[1] === 0) && create_if_block_2(ctx);

	function select_block_type(ctx, dirty) {
		if (/*hook*/ ctx[0].link && /*hook*/ ctx[0].link.length > 0) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block1 = current_block_type(ctx);
	let each_value_1 = /*hook*/ ctx[0].props;
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*hook*/ ctx[0].mutable;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block2 = /*hook*/ ctx[0].advanced && create_if_block(ctx);

	const block = {
		c: function create() {
			div4 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div0 = element("div");
			span = element("span");
			if_block1.c();
			t1 = text("\n    : ");
			t2 = text(t2_value);
			t3 = space();
			div1 = element("div");
			t4 = space();
			div2 = element("div");
			strong0 = element("strong");
			t5 = text("Props");
			t6 = text(" : ");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t7 = space();
			div3 = element("div");
			strong1 = element("strong");
			t8 = text("Mutable");
			t9 = text(" : ");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t10 = space();
			if (if_block2) if_block2.c();
			t11 = space();
			small = element("small");
			t12 = text(t12_value);
			t13 = text(" · Location: ");
			t14 = text(t14_value);
			this.h();
		},
		l: function claim(nodes) {
			div4 = claim_element(nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			if (if_block0) if_block0.l(div4_nodes);
			t0 = claim_space(div4_nodes);
			div0 = claim_element(div4_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span = claim_element(div0_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			if_block1.l(span_nodes);
			span_nodes.forEach(detach_dev);
			t1 = claim_text(div0_nodes, "\n    : ");
			t2 = claim_text(div0_nodes, t2_value);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div4_nodes);
			div1 = claim_element(div4_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div1_nodes.forEach(detach_dev);
			t4 = claim_space(div4_nodes);
			div2 = claim_element(div4_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			strong0 = claim_element(div2_nodes, "STRONG", {});
			var strong0_nodes = children(strong0);
			t5 = claim_text(strong0_nodes, "Props");
			strong0_nodes.forEach(detach_dev);
			t6 = claim_text(div2_nodes, " : ");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].l(div2_nodes);
			}

			div2_nodes.forEach(detach_dev);
			t7 = claim_space(div4_nodes);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			strong1 = claim_element(div3_nodes, "STRONG", {});
			var strong1_nodes = children(strong1);
			t8 = claim_text(strong1_nodes, "Mutable");
			strong1_nodes.forEach(detach_dev);
			t9 = claim_text(div3_nodes, " : ");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div3_nodes);
			}

			div3_nodes.forEach(detach_dev);
			t10 = claim_space(div4_nodes);
			if (if_block2) if_block2.l(div4_nodes);
			t11 = claim_space(div4_nodes);
			small = claim_element(div4_nodes, "SMALL", {});
			var small_nodes = children(small);
			t12 = claim_text(small_nodes, t12_value);
			t13 = claim_text(small_nodes, " · Location: ");
			t14 = claim_text(small_nodes, t14_value);
			small_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "hook-name");
			add_location(span, file, 73, 4, 1249);
			attr_dev(div0, "class", "overview svelte-obuov5");
			add_location(div0, file, 72, 2, 1222);
			attr_dev(div1, "class", "use svelte-obuov5");
			add_location(div1, file, 78, 2, 1422);
			add_location(strong0, file, 83, 4, 1496);
			attr_dev(div2, "class", "list svelte-obuov5");
			add_location(div2, file, 82, 2, 1473);
			add_location(strong1, file, 90, 4, 1739);
			attr_dev(div3, "class", "list svelte-obuov5");
			add_location(div3, file, 89, 2, 1716);
			add_location(small, file, 101, 2, 2119);
			attr_dev(div4, "class", "hook svelte-obuov5");
			add_location(div4, file, 69, 0, 1133);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div4, anchor);
			if (if_block0) if_block0.m(div4, null);
			append_hydration_dev(div4, t0);
			append_hydration_dev(div4, div0);
			append_hydration_dev(div0, span);
			if_block1.m(span, null);
			append_hydration_dev(div0, t1);
			append_hydration_dev(div0, t2);
			append_hydration_dev(div4, t3);
			append_hydration_dev(div4, div1);
			div1.innerHTML = raw_value;
			append_hydration_dev(div4, t4);
			append_hydration_dev(div4, div2);
			append_hydration_dev(div2, strong0);
			append_hydration_dev(strong0, t5);
			append_hydration_dev(div2, t6);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div2, null);
			}

			append_hydration_dev(div4, t7);
			append_hydration_dev(div4, div3);
			append_hydration_dev(div3, strong1);
			append_hydration_dev(strong1, t8);
			append_hydration_dev(div3, t9);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div3, null);
			}

			append_hydration_dev(div4, t10);
			if (if_block2) if_block2.m(div4, null);
			append_hydration_dev(div4, t11);
			append_hydration_dev(div4, small);
			append_hydration_dev(small, t12);
			append_hydration_dev(small, t13);
			append_hydration_dev(small, t14);
		},
		p: function update(ctx, [dirty]) {
			if (/*i*/ ctx[1] || /*i*/ ctx[1] === 0) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div4, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(span, null);
				}
			}

			if (dirty & /*hook*/ 1 && t2_value !== (t2_value = /*hook*/ ctx[0].context + "")) set_data_dev(t2, t2_value);
			if (dirty & /*hook*/ 1 && raw_value !== (raw_value = /*hook*/ ctx[0].use + "")) div1.innerHTML = raw_value;;

			if (dirty & /*hookEntityDefinitions, hook*/ 5) {
				each_value_1 = /*hook*/ ctx[0].props;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div2, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*hookEntityDefinitions, hook*/ 5) {
				each_value = /*hook*/ ctx[0].mutable;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div3, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*hook*/ ctx[0].advanced) {
				if (if_block2) {
					
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					if_block2.m(div4, t11);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*hook*/ 1 && t12_value !== (t12_value = (/*hook*/ ctx[0].expiremental ? 'Expiremental' : 'Stable') + "")) set_data_dev(t12, t12_value);
			if (dirty & /*hook*/ 1 && t14_value !== (t14_value = /*hook*/ ctx[0].location + "")) set_data_dev(t14, t14_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div4);
			if (if_block0) if_block0.d();
			if_block1.d();
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			if (if_block2) if_block2.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('HookDetail', slots, []);
	let { hook } = $$props;
	let { i } = $$props;
	let { hookEntityDefinitions } = $$props;
	const writable_props = ['hook', 'i', 'hookEntityDefinitions'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HookDetail> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('hook' in $$props) $$invalidate(0, hook = $$props.hook);
		if ('i' in $$props) $$invalidate(1, i = $$props.i);
		if ('hookEntityDefinitions' in $$props) $$invalidate(2, hookEntityDefinitions = $$props.hookEntityDefinitions);
	};

	$$self.$capture_state = () => ({ hook, i, hookEntityDefinitions });

	$$self.$inject_state = $$props => {
		if ('hook' in $$props) $$invalidate(0, hook = $$props.hook);
		if ('i' in $$props) $$invalidate(1, i = $$props.i);
		if ('hookEntityDefinitions' in $$props) $$invalidate(2, hookEntityDefinitions = $$props.hookEntityDefinitions);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [hook, i, hookEntityDefinitions];
}

class HookDetail extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { hook: 0, i: 1, hookEntityDefinitions: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HookDetail",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*hook*/ ctx[0] === undefined && !('hook' in props)) {
			console.warn("<HookDetail> was created without expected prop 'hook'");
		}

		if (/*i*/ ctx[1] === undefined && !('i' in props)) {
			console.warn("<HookDetail> was created without expected prop 'i'");
		}

		if (/*hookEntityDefinitions*/ ctx[2] === undefined && !('hookEntityDefinitions' in props)) {
			console.warn("<HookDetail> was created without expected prop 'hookEntityDefinitions'");
		}
	}

	get hook() {
		throw new Error("<HookDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hook(value) {
		throw new Error("<HookDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get i() {
		throw new Error("<HookDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<HookDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hookEntityDefinitions() {
		throw new Error("<HookDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hookEntityDefinitions(value) {
		throw new Error("<HookDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { HookDetail as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9va0RldGFpbC5iZmIzNGRjYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSG9va0RldGFpbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgZXhwb3J0IGxldCBob29rO1xuICBleHBvcnQgbGV0IGk7XG4gIGV4cG9ydCBsZXQgaG9va0VudGl0eURlZmluaXRpb25zO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmxpc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cblxuICAubGlzdCAuY29kZSB7XG4gICAgY3Vyc29yOiBoZWxwO1xuICB9XG5cbiAgLmhvb2sge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB0ZXh0LW92ZXJmbG93OiB3cmFwO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cblxuICAuaG9vay1udW1iZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDBweDtcbiAgICB3aWR0aDogMnJlbTtcbiAgICBoZWlnaHQ6IDEuNzVyZW07XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDFyZW07XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMXJlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZy10b3A6IDNweDtcbiAgICBiYWNrZ3JvdW5kOiAjZGRkO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuXG4gIC5vdmVydmlldyB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmhvb2s6bnRoLWNoaWxkKGV2ZW4pIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gICAgfVxuICAgIC5ob29rOm50aC1jaGlsZChvZGQpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICAgIH1cbiAgfVxuXG4gIC51c2Uge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuICA6Z2xvYmFsKC51c2UgdWwpIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gIH1cblxuICAub3ZlcnZpZXcge1xuICAgIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG4gICAgcGFkZGluZy1ib3R0b206IDAuNzVyZW07XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJob29rXCI+XG4gIHsjaWYgaSB8fCBpID09PSAwfTxzcGFuIGNsYXNzPVwiaG9vay1udW1iZXJcIj57aSArIDF9Ljwvc3Bhbj57L2lmfVxuXG4gIDxkaXYgY2xhc3M9XCJvdmVydmlld1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiaG9vay1uYW1lXCI+XG4gICAgICB7I2lmIGhvb2subGluayAmJiBob29rLmxpbmsubGVuZ3RoID4gMH08YSBocmVmPXtob29rLmxpbmt9Pntob29rLmhvb2t9PC9hPns6ZWxzZX17aG9vay5ob29rfXsvaWZ9XG4gICAgPC9zcGFuPlxuICAgIDoge2hvb2suY29udGV4dH1cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1c2VcIj5cbiAgICB7QGh0bWwgaG9vay51c2V9XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJsaXN0XCI+XG4gICAgPHN0cm9uZz5Qcm9wczwvc3Ryb25nPiA6IHsjZWFjaCBob29rLnByb3BzIGFzIHByb3B9XG4gICAgICA8ZGl2IGNsYXNzPVwiY29kZVwiIGRhdGEtYmFsbG9vbi1sZW5ndGg9XCJtZWRpdW1cIiBkYXRhLWJhbGxvb24tcG9zPVwidXBcIiBhcmlhLWxhYmVsPXtob29rRW50aXR5RGVmaW5pdGlvbnNbcHJvcF19PlxuICAgICAgICB7cHJvcH1cbiAgICAgIDwvZGl2PlxuICAgIHsvZWFjaH1cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsaXN0XCI+XG4gICAgPHN0cm9uZz5NdXRhYmxlPC9zdHJvbmc+IDogeyNlYWNoIGhvb2subXV0YWJsZSBhcyBtdXRhYmxlfVxuICAgICAgPGRpdiBjbGFzcz1cImNvZGVcIiBkYXRhLWJhbGxvb24tbGVuZ3RoPVwibWVkaXVtXCIgZGF0YS1iYWxsb29uLXBvcz1cInVwXCIgYXJpYS1sYWJlbD17aG9va0VudGl0eURlZmluaXRpb25zW211dGFibGVdfT5cbiAgICAgICAge211dGFibGV9XG4gICAgICA8L2Rpdj5cbiAgICB7L2VhY2h9XG4gIDwvZGl2PlxuXG4gIHsjaWYgaG9vay5hZHZhbmNlZH1cbiAgICA8ZGl2PjxzbWFsbD5UaGlzIGhvb2sgaXMgYW4gJ2FkdmFuY2VkJyBob29rIG1lYW5pbmcgaXQgZ2VhcmVkIHRvd2FyZHMgYWR2YW5jZWQgdXNlcnMgb3IgcGx1Z2lucy48L3NtYWxsPjwvZGl2PlxuICB7L2lmfVxuXG4gIDxzbWFsbD57aG9vay5leHBpcmVtZW50YWwgPyAnRXhwaXJlbWVudGFsJyA6ICdTdGFibGUnfSAmbWlkZG90OyBMb2NhdGlvbjoge2hvb2subG9jYXRpb259PC9zbWFsbD5cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVFK0MsQ0FBQSxJQUFBLFFBQUEsU0FBQSxHQUFDLE1BQUcsQ0FBQyxHQUFBLEVBQUEsQ0FBQTs7Ozs7Ozs7YUFBQyxHQUFDLENBQUEsQ0FBQTs7Ozs7OzsrQkFBRCxHQUFDLENBQUEsQ0FBQTs7Ozs7Ozs7O0dBQWxDLG9CQUF5QyxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7Ozs7O0FBQWQsR0FBQSxJQUFBLEtBQUEsU0FBQSxDQUFBLElBQUEsUUFBQSxNQUFBLFFBQUEsU0FBQSxHQUFDLE1BQUcsQ0FBQyxHQUFBLEVBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxFQUFBLEVBQUEsUUFBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSW9DLENBQUEsSUFBQSxPQUFBLFlBQUEsR0FBSSxJQUFDLElBQUksR0FBQSxFQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7O0FBQVQsR0FBQSxJQUFBLEtBQUEsWUFBQSxDQUFBLElBQUEsT0FBQSxNQUFBLE9BQUEsWUFBQSxHQUFJLElBQUMsSUFBSSxHQUFBLEVBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEvQixDQUFBLElBQUEsT0FBQSxZQUFBLEdBQUksSUFBQyxJQUFJLEdBQUEsRUFBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBckIsR0FBQSxRQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxZQUFBLFlBQUEsR0FBSSxJQUFDLElBQUksQ0FBQSxDQUFBOzs7O0dBQWxCLG9CQUFtQyxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7Ozs7QUFBZCxHQUFBLElBQUEsS0FBQSxZQUFBLENBQUEsSUFBQSxPQUFBLE1BQUEsT0FBQSxZQUFBLEdBQUksSUFBQyxJQUFJLEdBQUEsRUFBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFBckIsR0FBQSxJQUFBLEtBQUEsWUFBQSxDQUFBLElBQUEsWUFBQSxNQUFBLFlBQUEsWUFBQSxHQUFJLElBQUMsSUFBSSxDQUFBLEVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQVd0RCxHQUFJLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEMEUsR0FBQSxRQUFBLENBQUEsR0FBQSxFQUFBLFlB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
