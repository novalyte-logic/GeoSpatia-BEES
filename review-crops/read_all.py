import json, glob, os
def content(j):
    try:
        return j['choices'][0]['message']['content']
    except Exception:
        return json.dumps(j)[:2000]
order = ['desk_t0','desk_t1','desk_t2','desk_t3','desk_t4',
         'mob_t0','mob_t1','mob_t2','mob_t3','mob_t4','mob_t5','mob_t6','mob_t7','mob_t8']
for name in order:
    p = f"{name}.json"
    if not os.path.exists(p):
        print(f"\n##### {name}: MISSING #####\n"); continue
    with open(p) as f:
        j = json.load(f)
    print(f"\n===== {name} =====")
    print(content(j).strip())
