import { act, renderHook, waitFor } from "@testing-library/react";
import PouchDB from "pouchdb";
import memory from "pouchdb-adapter-memory";
import { afterEach, beforeEach, describe } from "vitest";

import usePouchDb from "../../src/hooks/usePouchDb";

PouchDB.plugin(memory);

let myPouch: PouchDB.Database;

type TestDocument = {
  _id: string;
  _rev?: string;
  name: string;
};

describe("usePouchDb", () => {
  beforeEach(() => {
    myPouch = new PouchDB("test", { adapter: "memory" });
  });

  afterEach(async () => {
    await myPouch.destroy();
  });

  it("should initialize loading state to false", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));
    expect(result.current.loading).toBe(false);
  });

  it("should initialize error state to null", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));
    expect(result.current.error).toBe(null);
  });

  it("should fetch documents from the database", async () => {
    const testDocuments = [
      { _id: "1", name: "John" },
      { _id: "2", name: "Jane" },
    ];
    await myPouch.bulkDocs(testDocuments);

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    let fetchedDocs: TestDocument[] = [];
    await act(async () => {
      fetchedDocs = await result.current.fetchDocs();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(fetchedDocs).toHaveLength(testDocuments.length);
    expect(fetchedDocs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1", name: "John" }),
        expect.objectContaining({ _id: "2", name: "Jane" }),
      ]),
    );
  });

  it("should update loading state correctly in fetchDocs function", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    act(() => {
      result.current.fetchDocs();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should add a document to the database", async () => {
    const documentToAdd = { _id: "3", name: "Bob" };
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    let addedDoc: TestDocument = { _id: "3", name: "Bob" };

    await act(async () => {
      addedDoc = await result.current.addDoc(documentToAdd);
    });

    expect(addedDoc).toEqual(expect.objectContaining(documentToAdd));
  });
});
