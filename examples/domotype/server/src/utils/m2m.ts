const firstElementInIntersection = <T extends any>(
  a: Set<T>,
  b: Set<T>,
): T | undefined => {
  if (a.size > b.size) {
    return firstElementInIntersection(b, a);
  }
  for (const element of a) {
    if (b.has(element)) {
      return element;
    }
  }
};

export class ManyToManyThrought<A, B, T> {
  public mapTA: Map<T, A> = new Map();
  public mapAT: Map<A, Set<T>> = new Map();
  public mapTB: Map<T, B> = new Map();
  public mapBT: Map<B, Set<T>> = new Map();

  public set(a: A, b: B, t: T): ManyToManyThrought<A, B, T> {
    if (this.has(t)) {
      this.remove(t);
    }

    this.mapTA.set(t, a);
    if (!this.mapAT.has(a)) {
      this.mapAT.set(a, new Set());
    }
    (this.mapAT.get(a) as Set<T>).add(t);

    this.mapTB.set(t, b);
    if (!this.mapBT.has(b)) {
      this.mapBT.set(b, new Set());
    }
    (this.mapBT.get(b) as Set<T>).add(t);

    return this;
  }

  public remove(t: T): ManyToManyThrought<A, B, T> {
    if (!this.has(t)) {
      return this;
    }

    const a = this.mapTA.get(t) as A;
    const b = this.mapTB.get(t) as B;
    this.mapTA.delete(t);
    this.mapTB.delete(t);

    const tsFromA = this.mapAT.get(a) as Set<T>;
    tsFromA.delete(t);
    if (tsFromA.size <= 0) {
      this.mapAT.delete(a);
    }

    const tsFromB = this.mapBT.get(b) as Set<T>;
    tsFromB.delete(t);
    if (tsFromB.size <= 0) {
      this.mapBT.delete(b);
    }

    return this;
  }

  public removeA(a: A): ManyToManyThrought<A, B, T> {
    const ts = this.mapAT.get(a);
    if (!ts) {
      return this;
    }
    this.mapAT.delete(a);
    ts.forEach((t) => {
      this.mapTA.delete(t);

      const b = this.mapTB.get(t) as B;
      const tsFromB = this.mapBT.get(b) as Set<T>;
      tsFromB.delete(t);
      if (tsFromB.size <= 0) {
        this.mapBT.delete(b);
      }
    });
    return this;
  }

  public removeB(b: B): ManyToManyThrought<A, B, T> {
    const ts = this.mapBT.get(b);
    if (!ts) {
      return this;
    }
    this.mapBT.delete(b);
    ts.forEach((t) => {
      this.mapTB.delete(t);

      const a = this.mapTA.get(t) as A;
      const tsFromA = this.mapAT.get(a) as Set<T>;
      tsFromA.delete(t);
      if (tsFromA.size <= 0) {
        this.mapAT.delete(a);
      }
    });
    return this;
  }

  public has(t: T): boolean {
    return this.mapTA.has(t);
  }

  public hasA(a: A): boolean {
    return this.mapAT.has(a);
  }

  public hasB(b: B): boolean {
    return this.mapBT.has(b);
  }

  public get(a: A, b: B): T | undefined {
    const tsFromA = this.mapAT.get(a);
    if (!tsFromA) {
      return;
    }
    const tsFromB = this.mapBT.get(b);
    if (!tsFromB) {
      return;
    }
    const element = firstElementInIntersection(tsFromA, tsFromB);
    return element;
  }

  public getA(t: T): A | undefined {
    return this.mapTA.get(t);
  }

  public getB(t: T): B | undefined {
    return this.mapTB.get(t);
  }

  public getTfromA(a: A): Set<T> {
    return new Set(this.mapAT.get(a));
  }

  public getTfromB(b: B): Set<T> {
    return new Set(this.mapBT.get(b));
  }
}
