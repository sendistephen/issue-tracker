import Pagination from './components/Pagination';

export default function Home() {
  return (
    <div>
      <Pagination currentPage={1} pageSize={10} itemCount={20} />
    </div>
  );
}
